Feature: Carrusel en la página de inicio

  Scenario: El usuario ve el carrusel al entrar a la página principal
    Given el usuario navega a la página de inicio
    Then debe ver el carrusel de imágenes

  Scenario: El carrusel muestra la primera imagen por defecto
    Given el usuario navega a la página de inicio
    Then el carrusel debe mostrar la primera imagen por defecto

  Scenario: El usuario navega a la siguiente imagen del carrusel
    Given el usuario navega a la página de inicio
    When el usuario hace clic en el botón "next" del carrusel
    Then el carrusel debe mostrar la segunda imagen