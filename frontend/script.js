const API_URL = "http://127.0.0.1:5000/predict";

const form = document.getElementById("predictionForm");
const predictBtn = document.getElementById("predictBtn");
const btnLabel = predictBtn.querySelector(".btn-label");
const predictionValue = document.getElementById("predictionValue");
const resultDescription = document.querySelector(".result-description");
const statusMessage = document.getElementById("statusMessage");
const resultPanel = document.getElementById("resultPanel");

const BTN_IDLE = "Estimate charges";
const BTN_BUSY = "Calculating";

function setStatus(text, isError = false) {
    statusMessage.textContent = text;
    statusMessage.classList.toggle("is-error", isError);
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
        age: Number(document.getElementById("age").value),
        sex: document.getElementById("sex").value,
        bmi: Number(document.getElementById("bmi").value),
        children: Number(document.getElementById("children").value),
        smoker: document.getElementById("smoker").value,
        region: document.getElementById("region").value
    };

    if (
        !Number.isFinite(data.age) ||
        !Number.isFinite(data.bmi) ||
        !Number.isFinite(data.children) ||
        data.age < 18 ||
        data.age > 100 ||
        data.bmi < 10 ||
        data.bmi > 100
    ) {
        setStatus("Check your details: age must be 18 to 100 and BMI 10 to 100.", true);
        return;
    }

    predictBtn.disabled = true;
    btnLabel.textContent = BTN_BUSY;
    predictionValue.textContent = "...";
    setStatus("Sending your details to the model.");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Prediction request failed.");
        }

        if (!Number.isFinite(result.prediction)) {
            throw new Error("The server returned an invalid prediction.");
        }

        predictionValue.textContent = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2
        }).format(result.prediction);

        resultDescription.textContent =
            "Estimated yearly charges for the profile you entered.";
        setStatus("Estimate ready.");

        // On phones the result sits below the form, so bring it into view.
        if (window.matchMedia("(max-width: 860px)").matches) {
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            resultPanel.scrollIntoView({
                behavior: reduce ? "auto" : "smooth",
                block: "start"
            });
        }

    } catch (error) {
        predictionValue.textContent = "\u2014";
        resultDescription.textContent =
            "We could not calculate your estimate right now.";

        setStatus(
            error.message.includes("Failed to fetch")
                ? "Cannot reach the server. Start your Flask app and try again."
                : error.message,
            true
        );

    } finally {
        predictBtn.disabled = false;
        btnLabel.textContent = BTN_IDLE;
    }
});