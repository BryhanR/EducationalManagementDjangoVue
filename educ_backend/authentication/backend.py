from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

from rest_framework.authentication import get_authorization_header
from django.core import exceptions


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


class JWTAuthentication(object):

    """
    Simple token based authentication.
    Clients should authenticate by passing the token key in the "Authorization"
    HTTP header, prepended with the string "Token ".  For example:
    Authorization: Token 401f7ac837da42b97f613d789819ff93537bee6a
    """

    def authenticate(self, request):
        auth = get_authorization_header(request).split()

        if not auth or auth[0].lower() != b'token':
            return None

        try:
            token = auth[1].decode()
        except UnicodeError:
            msg = _('Invalid token header. Token string should not contain invalid characters.')
            raise exceptions.AuthenticationFailed(msg)

        return self.authenticate_credentials(token)

        def authenticate_credentials(self, payload):

            decoded_dict = jws.verify(payload, 'seKre8', algorithms=['HS256'])

            username = decoded_dict.get('username', None)
            expiry = decoded_dict.get('expiry', None)

            try:
                usr = User.objects.get(username=username)
            except model.DoesNotExist:
                raise exceptions.AuthenticationFailed(_('Invalid token.'))

            if not usr.is_active:
                raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))

            if expiry < datetime.date.today():
                raise exceptions.AuthenticationFailed(_('Token Expired.'))

            return (usr, payload)

        def authenticate_header(self, request):
            return 'Token'
