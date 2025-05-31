# Terraform Scripts for ChakraVision Azure Deployment

This directory contains Terraform scripts to automate the deployment of ChakraVision to Azure Static Web Apps, including Application Insights for monitoring user engagement.

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) installed (v1.0.0 or later)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed
- Azure subscription
- GitHub repository with the ChakraVision application
- GitHub Personal Access Token with repo scope

## Configuration

1. **Login to Azure**

   ```bash
   az login
   ```

2. **Create a terraform.tfvars file**

   Create a `terraform.tfvars` file in this directory with the following variables:

   ```hcl
   resource_group_name = "your-resource-group-name"
   location            = "your-preferred-azure-region"
   app_name            = "your-app-name"
   custom_domain       = "your-custom-domain.com"
   github_repo         = "https://github.com/yourusername/chakra-vision"
   github_token        = "your-github-personal-access-token"
   ```

   Note: The `terraform.tfvars` file contains sensitive information and should not be committed to version control. Add it to your `.gitignore` file.

## Usage

1. **Initialize Terraform**

   ```bash
   terraform init
   ```

2. **Plan the deployment**

   ```bash
   terraform plan
   ```

   This will show you what resources will be created.

3. **Apply the configuration**

   ```bash
   terraform apply
   ```

   Type `yes` when prompted to confirm the deployment.

4. **Configure DNS for custom domain**

   After the deployment is complete, Terraform will output a validation token for your custom domain. You need to create a TXT record in your DNS settings:

   - Record Type: TXT
   - Name: @ or your subdomain
   - Value: The validation token from the Terraform output

   Once the DNS record is propagated, Azure will automatically validate your domain and issue an SSL certificate.

## Outputs

- `static_web_app_url`: The default URL of your Static Web App
- `application_insights_key`: The instrumentation key for Application Insights
- `custom_domain_validation_token`: The token to validate your custom domain

## Cleanup

To remove all resources created by Terraform:

```bash
terraform destroy
```

Type `yes` when prompted to confirm the deletion of resources.

## Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Terraform Azure Provider Documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Application Insights Documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)