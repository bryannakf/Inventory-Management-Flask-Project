FROM python:3.11-slim

# Working folder inside container
WORKDIR /app

# Copy dependency file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Open port
EXPOSE 5000

# Run Flask app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]