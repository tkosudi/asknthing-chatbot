locals {
  name_prefix = "${var.project}-${var.environment}"
}

resource "azurerm_resource_group" "rg" {
  name     = "${local.name_prefix}-rg"
  location = var.location
}

resource "azurerm_service_plan" "plan" {
  name                = "${local.name_prefix}-plan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = var.plan_sku # F1 (free) ou B1 se F1 não estiver disponível na sua região
}

resource "azurerm_linux_web_app" "web" {
  name                = "${local.name_prefix}-web"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {
    application_stack {
      node_version = var.node_version
    }
    # Em planos Free/Shared, AlwaysOn não é suportado
    # Desabilitado no plano F1
    always_on = var.plan_sku != "F1" && var.plan_sku != "D1"
  }

  app_settings = {
    NODE_ENV                            = var.environment
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = "false"
    SCM_DO_BUILD_DURING_DEPLOYMENT      = "true"
    OPENAI_MODEL                        = var.OPENAI_MODEL
    OPENAI_API_KEY                      = var.OPENAI_API_KEY
  }

  https_only = true
}
