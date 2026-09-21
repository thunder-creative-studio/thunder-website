// ==============================
// THUNDER CREATIVE STUDIO
// Main JavaScript
// ==============================


// ------------------------------
// ELEMENTS
// ------------------------------

const body = document.body;

const themeToggle = document.getElementById("themeToggle");

const orderForm = document.getElementById("orderForm");
const submitOrder = document.getElementById("submitOrder");
const formStatus = document.getElementById("formStatus");

const serviceSelect = document.getElementById("service");

const serviceButtons = document.querySelectorAll(
    "[data-service-target]"
);

const serviceExtraFields = document.querySelectorAll(
    "[data-service-fields]"
);

const revealElements = document.querySelectorAll(
    ".reveal"
);


// ==============================
// DARK / LIGHT MODE
// ==============================

function setTheme(theme) {

    if (theme === "dark") {

        body.classList.add("dark");

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );
        }

    } else {

        body.classList.remove("dark");

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );
        }
    }
}


// LOAD SAVED THEME

const savedTheme = localStorage.getItem(
    "thunder-theme"
);

if (savedTheme === "dark") {

    setTheme("dark");

} else {

    setTheme("light");
}


// THEME BUTTON

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            const darkMode =
                body.classList.contains("dark");

            if (darkMode) {

                setTheme("light");

                localStorage.setItem(
                    "thunder-theme",
                    "light"
                );

            } else {

                setTheme("dark");

                localStorage.setItem(
                    "thunder-theme",
                    "dark"
                );
            }

        }
    );

}


// ==============================
// SCROLL REVEAL ANIMATION
// ==============================

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }

        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    // Fallback for old browsers

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "is-visible"
            );

        }
    );

}


// ==============================
// SERVICE FORM FIELDS
// ==============================


function updateServiceFields() {

    if (!serviceSelect) {
        return;
    }

    const selectedService = serviceSelect.value;

    serviceExtraFields.forEach(function (section) {

        const isActive =
            section.dataset.serviceFields === selectedService;

        section.hidden = !isActive;

        const fields =
            section.querySelectorAll(
                "input, select, textarea"
            );

        fields.forEach(function (field) {
            field.disabled = !isActive;
        });

    });

}
// UPDATE EXTRA FIELDS WHEN SERVICE CHANGES

if (serviceSelect) {

    serviceSelect.addEventListener(
        "change",
        updateServiceFields
    );

}


// SET CORRECT STATE ON PAGE LOAD

updateServiceFields();
// ==============================
// SERVICE BUTTONS
// ==============================

serviceButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedService =
                    button.dataset.serviceTarget;

                if (!serviceSelect) {
                    return;
                }

                serviceSelect.value =
                    selectedService;

                updateServiceFields();

            }
        );

    }
);


// ==============================
// DEADLINE
// Prevent past dates
// ==============================

const deadlineInput =
    document.getElementById("deadline");

if (deadlineInput) {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    deadlineInput.min =
        `${year}-${month}-${day}`;
}


// ==============================
// CLEAN FORMSPREE SUBMISSION
// ==============================

const formspreeEndpoint =
    "https://formspree.io/f/xljerdzz";


function getCheckedValues(name) {

    return Array.from(
        document.querySelectorAll(
            `input[name="${name}"]:checked`
        )
    )
    .map(function (input) {
        return input.value;
    })
    .join(", ");

}


function addLine(lines, label, value) {

    if (!value) {
        return;
    }

    const cleanValue =
        String(value).trim();

    if (!cleanValue) {
        return;
    }

    lines.push(
        `${label}: ${cleanValue}`
    );

}


function buildProjectSummary() {

    const service =
        serviceSelect.value;

    const lines = [];


    lines.push(
        "THUNDER CREATIVE STUDIO"
    );

    lines.push(
        "NEW PROJECT REQUEST"
    );

    lines.push(
        "--------------------------------"
    );


    // GENERAL PROJECT DETAILS

    addLine(
        lines,
        "Service",
        service
    );

    addLine(
        lines,
        "Business / Brand",
        document.getElementById(
            "businessName"
        )?.value
    );

    addLine(
        lines,
        "Estimated Budget",
        document.getElementById(
            "budget"
        )?.value
    );

    addLine(
        lines,
        "Preferred Deadline",
        document.getElementById(
            "deadline"
        )?.value
    );


    lines.push(
        ""
    );

    lines.push(
        "PROJECT BRIEF"
    );

    lines.push(
        "--------------------------------"
    );


    // ==========================
    // GRAPHIC DESIGN
    // ==========================

    if (service === "Graphic Design") {

        addLine(
            lines,
            "Design Type",
            document.getElementById(
                "graphicType"
            )?.value
        );

        addLine(
            lines,
            "Number of Designs",
            document.getElementById(
                "designQuantity"
            )?.value
        );

        addLine(
            lines,
            "Platform / Format",
            document.getElementById(
                "graphicPlatform"
            )?.value
        );

        addLine(
            lines,
            "Main Goal",
            getCheckedValues(
                "graphic_goal"
            )
        );

        addLine(
            lines,
            "Preferred Style",
            getCheckedValues(
                "graphic_style"
            )
        );

        addLine(
            lines,
            "Available Brand Materials",
            getCheckedValues(
                "brand_materials"
            )
        );

        addLine(
            lines,
            "Design Notes",
            document.getElementById(
                "graphicNotes"
            )?.value
        );

    }


    // ==========================
    // PRESENTATION DESIGN
    // ==========================

    if (service === "Presentation Design") {

        addLine(
            lines,
            "Presentation Type",
            document.getElementById(
                "presentationType"
            )?.value
        );

        addLine(
            lines,
            "Number of Slides",
            document.getElementById(
                "slideCount"
            )?.value
        );

        addLine(
            lines,
            "Format",
            document.getElementById(
                "presentationPlatform"
            )?.value
        );

        addLine(
            lines,
            "Audience",
            document.getElementById(
                "presentationAudience"
            )?.value
        );

        addLine(
            lines,
            "Main Goal",
            getCheckedValues(
                "presentation_goal"
            )
        );

        addLine(
            lines,
            "Preferred Style",
            getCheckedValues(
                "presentation_style"
            )
        );

        addLine(
            lines,
            "Content Status",
            getCheckedValues(
                "presentation_content_status"
            )
        );

        addLine(
            lines,
            "Available Materials",
            getCheckedValues(
                "presentation_materials"
            )
        );

        addLine(
            lines,
            "Presentation Notes",
            document.getElementById(
                "presentationNotes"
            )?.value
        );

    }


    // ==========================
    // WEBSITE DEVELOPMENT
    // ==========================

    if (service === "Website Development") {

        addLine(
            lines,
            "Website Type",
            document.getElementById(
                "websiteType"
            )?.value
        );

        addLine(
            lines,
            "Number of Pages",
            document.getElementById(
                "pageCount"
            )?.value
        );

        addLine(
            lines,
            "Main Goal",
            getCheckedValues(
                "website_goal"
            )
        );

        addLine(
            lines,
            "Preferred Style",
            getCheckedValues(
                "website_style"
            )
        );

        addLine(
            lines,
            "Requested Features",
            getCheckedValues(
                "website_features"
            )
        );

        addLine(
            lines,
            "Content Status",
            getCheckedValues(
                "website_content_status"
            )
        );

        addLine(
            lines,
            "Available Materials",
            getCheckedValues(
                "website_materials"
            )
        );

        addLine(
            lines,
            "Domain / Hosting",
            getCheckedValues(
                "domain_hosting"
            )
        );

        addLine(
            lines,
            "Website Notes",
            document.getElementById(
                "websiteNotes"
            )?.value
        );

    }


    const generalDetails =
        document.getElementById(
            "projectDetails"
        )?.value;


    if (generalDetails) {

        lines.push(
            ""
        );

        lines.push(
            "ADDITIONAL DETAILS"
        );

        lines.push(
            "--------------------------------"
        );

        lines.push(
            generalDetails.trim()
        );

    }


    return lines.join("\n");

}


if (
    orderForm &&
    submitOrder &&
    formStatus
) {

    orderForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (!orderForm.checkValidity()) {

                orderForm.reportValidity();

                return;

            }


            submitOrder.disabled = true;

            submitOrder.textContent =
                "SENDING...";

            formStatus.textContent = "";

            formStatus.className =
                "form-status";


            try {

                const clientName =
                    document.getElementById(
                        "clientName"
                    ).value.trim();

                const clientEmail =
                    document.getElementById(
                        "clientEmail"
                    ).value.trim();

                const clientPhone =
                    document.getElementById(
                        "clientPhone"
                    ).value.trim();

                const service =
                    serviceSelect.value;


                const formData =
                    new FormData();


                // CLEAN EMAIL FIELDS

                formData.append(
                    "Client Name",
                    clientName
                );


                formData.append(
                    "email",
                    clientEmail
                );


                if (clientPhone) {

                    formData.append(
                        "Phone",
                        clientPhone
                    );

                }


                formData.append(
                    "Service",
                    service
                );


                formData.append(
                    "Project Brief",
                    buildProjectSummary()
                );


                formData.append(
                    "subject",
                    `Thunder Project — ${service} — ${clientName}`
                );


                const response =
                    await fetch(
                        formspreeEndpoint,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Submission failed"
                    );

                }


                formStatus.innerHTML = `
    <span class="status-icon">✓</span>

    <span class="status-content">
        <strong>REQUEST RECEIVED</strong>

        <small>
            Thanks for reaching out. We'll review your project
            and contact you using the details you provided.
        </small>
    </span>
`;

formStatus.className =
    "form-status success";


                orderForm.reset();

                updateServiceFields();


            } catch (error) {

                formStatus.textContent =
                    "The request could not be sent. Please try again.";

                formStatus.classList.add(
                    "error"
                );


            } finally {

                submitOrder.disabled = false;

                submitOrder.textContent =
                    "SEND PROJECT REQUEST ↗";

            }

        }
    );

}
// ==============================
// PORTFOLIO LIGHTBOX
// ==============================

const portfolioLightbox =
    document.getElementById("portfolioLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const lightboxClose =
    document.getElementById("lightboxClose");


const portfolioImages =
    document.querySelectorAll(
        ".design-item img, .website-preview img"
    );


function openLightbox(image) {

    if (
        !portfolioLightbox ||
        !lightboxImage
    ) {
        return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    if (lightboxCaption) {
        lightboxCaption.textContent =
            image.alt;
    }

    portfolioLightbox.classList.add(
        "active"
    );

    portfolioLightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "lightbox-open"
    );

}


function closeLightbox() {

    if (!portfolioLightbox) {
        return;
    }

    portfolioLightbox.classList.remove(
        "active"
    );

    portfolioLightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "lightbox-open"
    );

}


portfolioImages.forEach(
    function (image) {

        image.addEventListener(
            "click",
            function () {

                openLightbox(image);

            }
        );

    }
);


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (portfolioLightbox) {

    portfolioLightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                portfolioLightbox
            ) {

                closeLightbox();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);
// ==============================
// ACTIVE NAVBAR ON SCROLL
// ==============================

const navLinks =
    document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );


const navSections =
    Array.from(navLinks)
        .map(function (link) {

            const id =
                link.getAttribute("href");

            return document.querySelector(id);

        })
        .filter(Boolean);


function updateActiveNav() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 180;


    navSections.forEach(
        function (section) {

            if (
                scrollPosition >= section.offsetTop
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        function (link) {

            const linkSection =
                link
                    .getAttribute("href")
                    .replace("#", "");

            link.classList.toggle(
                "active",
                linkSection === currentSection
            );

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    {
        passive: true
    }
);


window.addEventListener(
    "load",
    updateActiveNav
);