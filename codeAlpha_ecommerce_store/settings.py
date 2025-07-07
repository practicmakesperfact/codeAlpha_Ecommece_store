from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
SECRET_KEY = 'django-insecure-k)1h!0ub*1p_m47$^8r_%ngb()myh2v%i-&%wa(!f-opph$q*c'
DEBUG = True

# Host and domain configuration
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# GitHub Codespaces configuration
if 'GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN' in os.environ:
    CODESPACE_NAME = os.environ.get('CODESPACE_NAME', 'expert-fortnight-wrgxxjvwwpw52gq75')
    CODESPACES_DOMAIN = os.environ['GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN']
    CODESPACE_BACKEND_URL = f'{CODESPACE_NAME}-8000.{CODESPACES_DOMAIN}'
    CODESPACE_FRONTEND_URL = f'{CODESPACE_NAME}-5173.{CODESPACES_DOMAIN}'  # Change 5173 to 5174 if needed

    ALLOWED_HOSTS.extend([
        CODESPACE_BACKEND_URL,
        CODESPACE_FRONTEND_URL,
        f'*.{CODESPACES_DOMAIN}'
    ])
    
    BASE_URL = f'https://{CODESPACE_BACKEND_URL}'
else:
    BASE_URL = 'http://localhost:8000'

# Media files configuration
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
FILE_UPLOAD_PERMISSIONS = 0o644
FILE_UPLOAD_DIRECTORY_PERMISSIONS = 0o755

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'store',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'codeAlpha_ecommerce_store.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'codeAlpha_ecommerce_store.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ]
}

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    # Add 5174 if your frontend runs on that port
]

if 'GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN' in os.environ:
    CORS_ALLOWED_ORIGINS.append(f"https://{CODESPACE_FRONTEND_URL}")

CORS_ALLOW_CREDENTIALS = True

# CSRF Settings
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "https://localhost:8000",
    "https://127.0.0.1:8000",
]

if 'GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN' in os.environ:
    CSRF_TRUSTED_ORIGINS.extend([
        f"https://{CODESPACE_BACKEND_URL}",
        f"https://{CODESPACE_FRONTEND_URL}"
    ])

# Security (for production)
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')