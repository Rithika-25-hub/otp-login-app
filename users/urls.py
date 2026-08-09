from django.urls import path
from .views import RegisterView, CheckEmailView, VerifyCodeView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('check-email/', CheckEmailView.as_view()),
    path('verify-code/', VerifyCodeView.as_view(), name='verify_code'),
]