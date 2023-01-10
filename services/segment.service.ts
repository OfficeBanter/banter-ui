import authService from "./auth.service";

export type SegmentEventName =
  | "sign_up"
  | "selected_channel"
  | "selected_topics"
  | "selected_time"
  | "updated_settings"
  | "checked_out"
  | "viewed_billing"
  | "log_in";

const track = (event_name: SegmentEventName, additionalData?: any) => {
  const user = authService.getUser();
  if (!user) return;

  const data = {
    name: user.name,
    email: user.email,
    workspace: user.workspace,
    ...(additionalData || {}),
  };
  window.analytics.track(event_name, data);
};

// • Selected Time
// • Updated settings
// • Checked out
// • Logged in

export default Object.freeze({
  track,
});
