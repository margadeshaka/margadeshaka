# Deployment Guide for ChakraVision

This guide provides instructions for deploying the ChakraVision application to either Vercel or Azure Static Web Apps, including setting up custom domains and SSL.

## Deploying to Vercel

### Prerequisites
- A [Vercel](https://vercel.com) account
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Connect your repository to Vercel**
   - Go to the [Vercel dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository
   - Select the repository containing your ChakraVision project

2. **Configure project settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Environment Variables: Add the variables from `.env.example` with appropriate values

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

### Setting up a Custom Domain

1. **Add a custom domain**
   - Go to your project in the Vercel dashboard
   - Navigate to "Settings" > "Domains"
   - Click "Add Domain"
   - Enter your domain name (e.g., chakra-vision.com)
   - Follow the instructions to configure your DNS settings

2. **SSL Configuration**
   - Vercel automatically provisions SSL certificates for custom domains
   - No additional configuration is required

## Deploying to Azure Static Web Apps

### Prerequisites
- An Azure account
- Your project pushed to a GitHub repository

### Steps

1. **Create an Azure Static Web App**
   - Go to the [Azure Portal](https://portal.azure.com)
   - Search for "Static Web Apps" and select it
   - Click "Create"
   - Fill in the required details:
     - Subscription: Select your subscription
     - Resource Group: Create new or select existing
     - Name: Enter a name for your app (e.g., chakra-vision)
     - Region: Select a region close to your users
     - SKU: Select the appropriate tier (Free for development)
     - Source: GitHub
     - Organization: Select your GitHub organization
     - Repository: Select your repository
     - Branch: main (or your default branch)
     - Build Presets: Next.js
     - App location: /
     - Api location: (leave empty)
     - Output location: .next

2. **Configure GitHub Actions**
   - Azure will automatically create a GitHub Actions workflow file in your repository
   - The workflow file will be similar to the one in `.github/workflows/azure-static-web-apps.yml`
   - Add the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret to your GitHub repository

3. **Environment Variables**
   - Go to your Static Web App in the Azure Portal
   - Navigate to "Configuration" > "Application settings"
   - Add the environment variables from `.env.example` with appropriate values

### Setting up a Custom Domain

1. **Add a custom domain**
   - Go to your Static Web App in the Azure Portal
   - Navigate to "Custom domains"
   - Click "Add"
   - Enter your domain name (e.g., chakra-vision.com)
   - Follow the instructions to validate domain ownership and configure DNS settings

2. **SSL Configuration**
   - Azure Static Web Apps automatically provisions SSL certificates for custom domains
   - No additional configuration is required

## Monitoring User Engagement

To monitor user engagement, you can integrate analytics tools like Google Analytics or Azure Application Insights.

### Google Analytics

1. Create a Google Analytics account and property
2. Get your Measurement ID (starts with "G-")
3. Add the Measurement ID as the `NEXT_PUBLIC_ANALYTICS_ID` environment variable
4. The analytics script is already integrated in the application

### Azure Application Insights

1. Create an Application Insights resource in Azure
2. Get the Instrumentation Key
3. Add the Instrumentation Key as the `NEXT_PUBLIC_ANALYTICS_ID` environment variable
4. The analytics script is already integrated in the application