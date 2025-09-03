# Environment Variables Setup

This project uses a dual environment file approach to separate feature flags from sensitive configuration.

## File Structure

### `.env.features` (Tracked by Git)

- Contains feature flags and non-sensitive configuration
- Safe to commit to version control
- Shared across all developers
- Used for toggling application features

### `.env` (Ignored by Git)

- Contains sensitive data like API keys
- Each developer maintains their own copy
- Never committed to version control
- Use `.env.example` as a template

### `.env.example` (Tracked by Git)

- Template file showing what variables are needed in `.env`
- Contains no actual sensitive values
- Helps new developers set up their environment

## Usage

### Setting Up for New Developers

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Fill in actual values in `.env` (API keys, etc.)

3. `.env.features` is already configured and ready to use

### Feature Flags

Feature flags are defined in `.env.features`:

```env
# Portfolio Features
# Note: VITE_FEATURED_PROJECTS_ENABLED has INVERTED logic - true means DISABLED
VITE_FEATURED_PROJECTS_ENABLED=false
VITE_CONTACT_FORM_ENABLED=true
VITE_ANIMATIONS_ENABLED=true
VITE_DARK_MODE_ENABLED=false

# Development Features
VITE_DEBUG_MODE=false
VITE_PERFORMANCE_MONITORING=false

# Analytics and Tracking
VITE_ANALYTICS_ENABLED=false
```

### Accessing Environment Variables

In your React components:

```typescript
// Feature flags (from .env.features)
// Note: VITE_FEATURED_PROJECTS_ENABLED uses inverted logic in the app
const featuredProjectsEnabled = import.meta.env.VITE_FEATURED_PROJECTS_ENABLED === "true";
const contactFormEnabled = import.meta.env.VITE_CONTACT_FORM_ENABLED === "true";

// Sensitive config (from .env)
const apiKey = import.meta.env.VITE_API_KEY;
```

## Load Order

Vite loads environment files in this order (later files override earlier ones):

1. `.env.features` (feature flags)
2. `.env` (sensitive local config)
3. `.env.local`
4. `.env.[mode]` (e.g., `.env.development`)
5. `.env.[mode].local`

## Benefits

- **Security**: Sensitive data never committed to Git
- **Flexibility**: Easy feature toggling without code changes
- **Collaboration**: Shared feature flags across team
- **Deployment**: Different configs for different environments

## Best Practices

1. Always prefix Vite environment variables with `VITE_`
2. Use boolean strings ('true'/'false') for feature flags
3. Document new environment variables in `.env.example`
4. Keep feature flags descriptive and organized by category
5. Regularly clean up unused feature flags
