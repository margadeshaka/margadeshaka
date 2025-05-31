# Azure Provider configuration
provider "azurerm" {
  features {}
}

# Variables
variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "chakra-vision-rg"
}

variable "location" {
  description = "Azure region to deploy resources"
  type        = string
  default     = "East US"
}

variable "app_name" {
  description = "Name of the Static Web App"
  type        = string
  default     = "chakra-vision"
}

variable "custom_domain" {
  description = "Custom domain for the Static Web App"
  type        = string
  default     = "chakra-vision.com"
}

variable "github_repo" {
  description = "GitHub repository URL"
  type        = string
}

variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

# Application Insights for monitoring user engagement
resource "azurerm_application_insights" "insights" {
  name                = "${var.app_name}-insights"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "web"
}

# Static Web App
resource "azurerm_static_site" "web" {
  name                = var.app_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku_tier            = "Standard"
  sku_size            = "Standard"

  # GitHub integration
  source {
    repo_url           = var.github_repo
    branch             = "main"
    github_token       = var.github_token
    build_properties {
      app_location     = "/"
      api_location     = ""
      output_location  = ".next"
      app_build_command = "npm run build"
    }
  }

  # App settings (environment variables)
  app_settings = {
    "NEXT_PUBLIC_BASE_URL"      = "https://${var.custom_domain}"
    "NEXT_PUBLIC_ANALYTICS_ID"  = azurerm_application_insights.insights.instrumentation_key
  }
}

# Custom domain for Static Web App
resource "azurerm_static_site_custom_domain" "domain" {
  static_site_id  = azurerm_static_site.web.id
  domain_name     = var.custom_domain
  validation_type = "dns-txt-token"
}

# Outputs
output "static_web_app_url" {
  value = azurerm_static_site.web.default_host_name
}

output "application_insights_key" {
  value     = azurerm_application_insights.insights.instrumentation_key
  sensitive = true
}

output "custom_domain_validation_token" {
  value = azurerm_static_site_custom_domain.domain.validation_token
}