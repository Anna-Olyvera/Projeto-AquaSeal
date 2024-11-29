import pickle
import pytest
from app import create_app
import threading
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options


@pytest.fixture
def client():
    """ Instance of Main flask app"""
    app = create_app(test=True, mock_model=77)

    client = app.test_client()

    ctx = app.test_request_context()
    ctx.push()

    yield client

    ctx.pop()


@pytest.fixture(scope="module")
def live_server():
    """Run the Flask app in a separate thread."""
    app = create_app(test=True, mock_model=77)

    server_thread = threading.Thread(target=app.run, kwargs={"port": 5000})
    server_thread.daemon = True
    server_thread.start()

    yield

    server_thread.join(1)


@pytest.fixture(scope="module")
def browser():
    """Set up a Selenium WebDriver instance in headless mode."""
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    yield driver
    driver.quit()
