class UserFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */
            `
            <footer class="text-center text-lg-start my-footer-bg text-muted pt-4">

        <!-- Section: Links  -->
        <section class="">
            <div class="container text-center text-md-start mt-5">
                <!-- Grid row -->
                <div class="row mt-3">
                    <!-- Grid column -->
                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">
                            Cartelera
                        </h6>
                        <h6 class="text-uppercase fw-bold mb-4">
                            Próximos Estrenos
                        </h6>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">Contactos</h6>
                        <p><i class="fas fa-location-dot me-3"></i> Google Maps</p>
                        <p>
                            <i class="fas fa-envelope me-3"></i> CinemasTlahuacMxOf@gmail.com
                        </p>
                        <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
                    </div>
                    <!-- Grid column -->
                </div>
                <!-- Grid row -->
            </div>
        </section>
        <!-- Section: Links  -->

        <!-- Copyright -->
        <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
            &copy; 2023 CINEMAS TLÁHUAC
        </div>
        <!-- Copyright -->
    </footer>
        `;
    }
}

customElements.define("user-footer", UserFooter);