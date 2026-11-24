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
      $bytes = [IO.File]::ReadAllBytes($full)
      $ext = [IO.Path]::GetExtension($full).ToLower()
      $ctx.Response.ContentType = if ($types[$ext]) { $types[$ext] } else { 'application/octet-stream' }
      $ctx.Response.Headers.Add('Cache-Control', 'no-store')
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
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
