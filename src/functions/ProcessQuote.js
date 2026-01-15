const { app } = require('@azure/functions');

app.http('ProcessQuote', {
    methods: ['GET','POST'],
    authLevel: 'anonymous',
    route: 'processquote',  
    handler: async (request, context) => {

        let body;
        try {
            body = await request.json();
        } catch {
            return {
                status: 400,
                jsonBody: { message: "Invalid JSON body" }
            };
        }

        const { age, vehicleType, claimHistory } = body;

        if (!age || !vehicleType) {
            return {
                status: 400,
                jsonBody: { message: "Invalid input data" }
            };
        }

        let riskScore = "Low";
        let premium = 8000;

        if (age < 25 || claimHistory > 0) {
            riskScore = "High";
            premium += 5000;
        } else if (vehicleType === "car") {
            riskScore = "Medium";
            premium += 3000;
        }

        return {
            status: 200,
            jsonBody: {
                message: "CI/CD working successfully 🚀2",
                riskScore,
                estimatedPremium: premium,
                processingStatus: "Auto-approved"
            }
        };
    }
});
