package pages;

import net.serenitybdd.core.pages.PageObject;
import net.thucydides.core.annotations.DefaultUrl;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;

@DefaultUrl("http://localhost:3000/") // Cambia la URL si tu app corre en otro puerto o ruta
public class HomePage extends PageObject {

    // Selectores del carrusel (usando data-testid recomendados)
    private By carrusel = By.cssSelector("[data-testid='carousel']");
    private By currentImage = By.cssSelector("[data-testid='current-image']");
    private By nextButton = By.cssSelector("[data-testid='next-button']");

    @Step("Verificar que el carrusel está visible")
    public void verifyCarouselVisible() {
        waitFor(ExpectedConditions.visibilityOfElementLocated(carrusel));
    }

    @Step("Verificar que la imagen actual contiene {0}")
    public void verifyCurrentImage(String expectedImageName) {
        String imageSrc = $(currentImage).getAttribute("src");
        assert imageSrc.contains(expectedImageName) : 
            "La imagen actual debería ser " + expectedImageName + " pero es " + imageSrc;
    }

    @Step("Hacer clic en el botón siguiente del carrusel")
    public void clickCarouselNext() {
        $(nextButton).click();
    }

    public void abrirPagina() {
        open();
    }

    public boolean estaCarruselVisible() {
        return $(carrusel).isDisplayed();
    }

    // Puedes agregar más métodos para interactuar con el carrusel
    public void clickBotonCarrusel(String boton) {
        if (boton.equalsIgnoreCase("next")) {
            $(By.cssSelector(".carousel-button.next")).click();
        } else if (boton.equalsIgnoreCase("prev")) {
            $(By.cssSelector(".carousel-button.prev")).click();
        }
    }

    public boolean imagenActualEs(String nombreImagen) {
        // Ejemplo: verifica si la imagen visible tiene el src esperado
        return $(By.cssSelector(".carousel-image[src*='" + nombreImagen + "']")).isDisplayed();
    }
}