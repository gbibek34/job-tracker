from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Job Tracker API"
    debug: bool = True
    supabase_url: str = ""
    supabase_key: str

    class Config:
        env_file = ".env"

settings = Settings()

