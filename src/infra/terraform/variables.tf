variable "project" {
  description = "Asknthing-chatbot-serjao-lanches"
  type        = string
}

variable "location" {
  description = "Região Azure (ex: brazilsouth, eastus)"
  type        = string
  default     = "brazilsouth"
}

variable "environment" {
  description = "Ambiente (dev, stg, prod)"
  type        = string
  default     = "dev"
}

variable "plan_sku" {
  description = "SKU do App Service Plan (F1 free, B1, etc.)"
  type        = string
  default     = "F1"
}

variable "node_version" {
  description = "Versão Node no App Service (ex: 22-lts, 20-lts)"
  type        = string
  default     = "22-lts"
}

# Opcional: passar secrets via TF_VAR_* (ou setaremos depois via GitHub Actions)
variable "OPENAI_API_KEY" {
  description = "API key da OpenAI para app settings"
  type        = string
  sensitive   = true
  default     = ""
}

variable "OPENAI_MODEL" {
  description = "Modelo default"
  type        = string
  default     = "gpt-4o-mini"
}
