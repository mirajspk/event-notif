from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

User = get_user_model()

class CookieTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get("access_token")
        if not access_token:
            return None  # No token, return None (unauthenticated)

        try:
            token = AccessToken(access_token)
            user = User.objects.get(id=token["user_id"])
            return (user, token)
        except Exception:
            raise AuthenticationFailed("Invalid token")

