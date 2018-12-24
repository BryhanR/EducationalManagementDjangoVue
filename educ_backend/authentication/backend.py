from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

class DefaultAuthenticationBackEnd:

    def authenticate(self, request, username=None, password=None):
        if username and password:
            try:
                user = User.objects.get(email=username)
                usr_valid = (user.email == username)
                pwd_valid = check_password(password, user.password)
                if usr_valid and pwd_valid:
                    return user
            except User.DoesNotExist:
                return None
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None