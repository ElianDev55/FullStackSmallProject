from rest_framework import serializers
from .models import Report
from apps.users.serializers import UserSerializer

class ReportSerializer(serializers.ModelSerializer):
    edit_url = serializers.SerializerMethodField()
    user = UserSerializer(source='id_user', read_only=True)

    class Meta:

        model = Report
        fields = '__all__'

    def get_edit_url(self, obj):
        request = self.context.get('request')
        if obj.edit and request is not None:
            return request.build_absolute_uri(obj.edit.url)
        return None