from rest_framework import serializers
from .models import Report

class ReportSerializer(serializers.ModelSerializer):
    edit_url = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = ('idreport', 'title', 'date', 'edit', 'edit_url')

    def get_edit_url(self, obj):
        request = self.context.get('request')
        if obj.edit and request is not None:
            return request.build_absolute_uri(obj.edit.url)
        return None