from django.db import models
from apps.users.models import User  # Importa el modelo User

class Report(models.Model):
    idreport = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
    edit = models.FileField(upload_to='files/')
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='id_user')

    def __str__(self):
        return self.title