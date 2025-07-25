from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAuthorOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        """ 
        Allow safe methods for everyone and require login for POST
        """
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated 
    
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True 
        return obj.author == request.user