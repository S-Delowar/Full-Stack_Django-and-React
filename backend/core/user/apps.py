from django.apps import AppConfig


class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.user'
    label = 'core_user'
    
    def ready(self):
        import core.user.signals
