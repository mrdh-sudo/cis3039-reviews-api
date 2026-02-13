import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { listDevices } from "../app/list-devices";
import { getDeviceRepo } from "../infra/appservices";

export async function listDevicesHttp(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const deviceRepo = getDeviceRepo();

    const devices = await listDevices({ deviceRepo });

    return {
      status: 200,
      jsonBody: devices
    };

  } catch (err: any) {
    context.error("Error listing devices", err);

    return {
      status: 500,
      jsonBody: {
        error: "InternalServerError",
        message: err?.message ?? "Unknown error"
      }
    };
  }
}

app.http("list-devices-http", {
  route: "devices",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: listDevicesHttp
});
