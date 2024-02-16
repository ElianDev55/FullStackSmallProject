from django.db import models

class Report(models.Model):
    idreport = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
    edit = models.FileField(upload_to='files/')

    def __str__(self):
        return self.title