from selenium.webdriver import Keys
from selenium.webdriver.common.by import By


def test_index_page(live_server, browser):
    """Test the index page loads correctly."""
    browser.get("http://localhost:5000/")
    assert "AquaSeal" in browser.title


def test_predict_page(live_server, browser):
    """Test the predict page loads correctly and Predict works correctly."""
    browser.get("http://localhost:5000/")
    browser.find_element(By.NAME, "alcalinidade").send_keys(1)
    browser.find_element(By.NAME, "amonia").send_keys(1)
    browser.find_element(By.NAME, "bOD").send_keys(1)
    browser.find_element(By.NAME, "cloreto").send_keys(1)
    browser.find_element(By.NAME, "condutividade").send_keys(1)
    browser.find_element(By.NAME, "oxigenioD").send_keys(1)
    browser.find_element(By.NAME, "ortofosfato").send_keys(1)
    browser.find_element(By.NAME, "ph").send_keys(1)
    browser.find_element(By.NAME, "temperatura").send_keys(1)
    browser.find_element(By.NAME, "durezaT").send_keys(1)
    browser.find_element(By.NAME, "corV").send_keys(1)
    browser.find_element(By.NAME, "corV").send_keys(Keys.RETURN)
    browser.implicitly_wait(5)
    page_html = browser.find_element(By.TAG_NAME, "html").get_attribute("innerHTML")
    assert "Water quality: Good" in page_html

