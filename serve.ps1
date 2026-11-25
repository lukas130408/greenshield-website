# Kleiner lokaler Webserver zum Ansehen der Webseite (nur auf diesem Computer).
# Starten:  powershell -ExecutionPolicy Bypass -File .\serve.ps1
# Dann im Browser öffnen:  http://localhost:8080/
# Beenden:  Strg + C im Terminal

param([int]$Port = 8080)

$root = $PSScriptRoot
$types = @{
  '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'
  '.js' = 'text/javascript; charset=utf-8'; '.json' = 'application/json'
  '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg'
  '.webp' = 'image/webp'; '.svg' = 'image/svg+xml'; '.ico' = 'image/x-icon'
  '.woff2' = 'font/woff2'; '.pdf' = 'application/pdf'; '.txt' = 'text/plain; charset=utf-8'
  '.xml' = 'application/xml; charset=utf-8'; '.mp4' = 'video/mp4'; '.webm' = 'video/webm'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Webseite laeuft auf http://localhost:$Port/  (Beenden mit Strg + C)"

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    try {
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    $file = Join-Path $root $path
    if (Test-Path $file -PathType Container) {
      if (-not $ctx.Request.Url.AbsolutePath.EndsWith('/')) {
        $ctx.Response.Redirect($ctx.Request.Url.AbsolutePath + '/'); $ctx.Response.Close(); continue
      }
      $file = Join-Path $file 'index.html'
    }
    $full = [IO.Path]::GetFullPath($file)
    if (-not $full.StartsWith($root) -or -not (Test-Path $full -PathType Leaf) -or $full -match '\\\.git\\') {
      $ctx.Response.StatusCode = 404
      $full = Join-Path $root '404.html'
    }
    if (Test-Path $full -PathType Leaf) {
      $ext = [IO.Path]::GetExtension($full).ToLower()
      $ctx.Response.ContentType = if ($types[$ext]) { $types[$ext] } else { 'application/octet-stream' }
      $ctx.Response.Headers.Add('Cache-Control', 'no-store')
      $ctx.Response.Headers.Add('Accept-Ranges', 'bytes')
      $fs = [IO.File]::OpenRead($full)
      try {
        $len = $fs.Length; $start = 0; $end = $len - 1
        # Videos are requested in pieces ("Range"), so the browser can jump around in them
        $range = $ctx.Request.Headers['Range']
        if ($range -match '^bytes=(\d*)-(\d*)$' -and $ctx.Response.StatusCode -eq 200) {
          if ($Matches[1]) { $start = [long]$Matches[1]; if ($Matches[2]) { $end = [Math]::Min([long]$Matches[2], $len - 1) } }
          elseif ($Matches[2]) { $start = [Math]::Max(0, $len - [long]$Matches[2]) }
          $ctx.Response.StatusCode = 206
          $ctx.Response.Headers.Add('Content-Range', "bytes $start-$end/$len")
        }
        $count = $end - $start + 1
        $ctx.Response.ContentLength64 = $count
        $fs.Seek($start, 'Begin') | Out-Null
        $buf = New-Object byte[] 65536
        while ($count -gt 0) {
          $n = $fs.Read($buf, 0, [Math]::Min($buf.Length, $count))
          if ($n -le 0) { break }
          $ctx.Response.OutputStream.Write($buf, 0, $n); $count -= $n
        }
      } finally { $fs.Dispose() }
    }
    Write-Host ("{0} {1}" -f $ctx.Response.StatusCode, $ctx.Request.Url.AbsolutePath)
    } catch {
      Write-Host ("Fehler bei {0}: {1}" -f $ctx.Request.Url.AbsolutePath, $_.Exception.Message)
    } finally {
      try { $ctx.Response.Close() } catch {}
    }
  }
} finally {
  $listener.Stop()
}
