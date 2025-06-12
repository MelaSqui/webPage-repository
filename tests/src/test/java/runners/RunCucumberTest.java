package runners;

import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
    features = "src/test/resources/features/ui", // Ajusta si tu feature está en otra ruta
    glue = {"steps", "pages"}
)
public class RunCucumberTest {}