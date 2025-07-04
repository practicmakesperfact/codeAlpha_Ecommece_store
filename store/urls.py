# from rest_framework.routers import DefaultRouter
# from .views import ProductViewSet, CartItemViewSet, OrderViewSet
# from django.urls import path, include


# router = DefaultRouter()
# router.register(r'products', ProductViewSet, basename='products')
# router.register(r'cart', CartItemViewSet, basename='cart')
# router.register(r'orders', OrderViewSet, basename='orders')

# urlpatterns = [
#     path('', include(router.urls)),
# ]
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ... your other URLs ...
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)   
