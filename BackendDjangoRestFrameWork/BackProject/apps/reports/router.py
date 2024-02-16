from django.urls import path
from .view import ReportViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('reports/', ReportViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('reports/<int:pk>/', ReportViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]