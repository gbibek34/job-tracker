from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Job Tracker API"
    debug: bool = True
    database_url: str = ""

    class Config:
        env_file = ".env"

settings = Settings()