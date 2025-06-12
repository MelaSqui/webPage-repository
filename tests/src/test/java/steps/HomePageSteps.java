package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import net.thucydides.core.annotations.Step;
import pages.HomePage;

public class HomePageSteps {

    HomePage homePage;

    @Given("el usuario navega a la página de inicio")
    public void el_usuario_navega_a_la_página_de_inicio() {
        // Implementa la navegación a la página de inicio aquí
        // Por ejemplo: homePage.open();
    }

    @Then("debe ver el carrusel de imágenes")
    public void debe_ver_el_carrusel_de_imágenes() {
        // Implementa la verificación del carrusel aquí
    }

    @Then("el carrusel debe mostrar la primera imagen por defecto")
    public void el_carrusel_debe_mostrar_la_primera_imagen_por_defecto() {
        // Implementa la verificación aquí
    }

    @When("el usuario hace clic en el botón {string} del carrusel")
    public void el_usuario_hace_clic_en_el_botón_del_carrusel(String boton) {
        // Implementa el click en el botón del carrusel aquí
    }

    @Then("el carrusel debe mostrar la segunda imagen")
    public void el_carrusel_debe_mostrar_la_segunda_imagen() {
        // Implementa la verificación aquí
    }
}