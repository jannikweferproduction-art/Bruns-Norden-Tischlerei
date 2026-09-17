(function () {
  "use strict";

  /* Footer-Jahr */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Header: Schatten/Hintergrund erst nach dem Scrollen (IntersectionObserver statt scroll-Listener) */
  var header = document.querySelector(".site-header");
  var sentinel = document.querySelector("[data-scroll-sentinel]");

  if (header && sentinel && "IntersectionObserver" in window) {
    var headerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          header.classList.toggle("is-scrolled", !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    headerObserver.observe(sentinel);
  }

  /* Mobiles Menü */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");

  function closeMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function openMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.contains("is-open");
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mobileNav.classList.contains("is-open")) {
        closeMobileNav();
        navToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 980) {
        closeMobileNav();
      }
    });
  }

  /* Kontaktformular: Validierung + mailto-Versand (kein Server-Backend angebunden) */
  var form = document.querySelector("[data-contact-form]");

  if (form) {
    var statusBox = form.querySelector("[data-form-status]");
    var recipient = form.getAttribute("data-recipient") || "";

    /* Anliegen aus Link-Parameter vorbelegen, z. B. kontakt.html?leistung=Moebelbau */
    var subjectField = form.querySelector("#anliegen");
    if (subjectField) {
      var params = new URLSearchParams(window.location.search);
      var pre = params.get("leistung");
      if (pre) {
        var match = Array.prototype.find.call(subjectField.options, function (opt) {
          return opt.value === pre;
        });
        if (match) {
          subjectField.value = pre;
        }
      }
    }

    function setFieldError(field, message) {
      var wrapper = field.closest(".form-field");
      if (!wrapper) return;
      var errorEl = wrapper.querySelector(".form-error");
      wrapper.classList.toggle("has-error", Boolean(message));
      if (errorEl) {
        errorEl.textContent = message || "";
      }
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var telefon = form.querySelector("#telefon");
      var nachricht = form.querySelector("#nachricht");
      var datenschutz = form.querySelector("#datenschutz");

      var valid = true;

      if (!name.value.trim()) {
        setFieldError(name, "Bitte geben Sie Ihren Namen an.");
        valid = false;
      } else {
        setFieldError(name, "");
      }

      var hasEmail = email.value.trim().length > 0;
      var hasPhone = telefon.value.trim().length > 0;

      if (!hasEmail && !hasPhone) {
        setFieldError(email, "Bitte E-Mail oder Telefonnummer angeben.");
        valid = false;
      } else if (hasEmail && !isValidEmail(email.value.trim())) {
        setFieldError(email, "Bitte eine gültige E-Mail-Adresse angeben.");
        valid = false;
      } else {
        setFieldError(email, "");
      }

      if (!nachricht.value.trim()) {
        setFieldError(nachricht, "Bitte beschreiben Sie kurz Ihr Anliegen.");
        valid = false;
      } else {
        setFieldError(nachricht, "");
      }

      if (datenschutz && !datenschutz.checked) {
        setFieldError(datenschutz, "Bitte bestätigen Sie die Datenschutzhinweise.");
        valid = false;
      } else if (datenschutz) {
        setFieldError(datenschutz, "");
      }

      if (!valid) {
        if (statusBox) {
          statusBox.textContent = "Bitte prüfen Sie die markierten Felder.";
          statusBox.className = "form-status is-visible is-error";
        }
        return;
      }

      var subject = subjectField && subjectField.value ? subjectField.value : "Anfrage über die Website";
      var bodyLines = [
        "Name: " + name.value.trim(),
        hasEmail ? "E-Mail: " + email.value.trim() : null,
        hasPhone ? "Telefon: " + telefon.value.trim() : null,
        "",
        nachricht.value.trim(),
      ].filter(Boolean);

      var mailto =
        "mailto:" +
        encodeURIComponent(recipient) +
        "?subject=" +
        encodeURIComponent("Website-Anfrage: " + subject) +
        "&body=" +
        encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;

      if (statusBox) {
        statusBox.textContent =
          "Ihr E-Mail-Programm sollte sich jetzt mit einer vorausgefüllten Nachricht öffnen. Falls sich nichts öffnet, schreiben Sie uns direkt an " +
          recipient +
          " oder rufen Sie an.";
        statusBox.className = "form-status is-visible is-success";
      }
    });
  }
})();
