output "app_url" {
  description = "URL pública da Web App"
  value       = "https://${azurerm_linux_web_app.web.default_hostname}"
}
