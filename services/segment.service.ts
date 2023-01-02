import { Injectable } from "@angular/core";
import { JwtService } from "src/app/core/services/jwt.service";
import { DataService } from "./data.service";
import { DAYS } from "../constants/days";
import authService from "./auth.service";
import { TAGS } from "../components/Constants/tags";

const identifyUser = () => {
  const user = authService.getUser();
  if (!user) return;
  window?.analytics.identify(user.id, {
    name: user.name,
    email: user.email,
    workspace: user.workspace,
  });
};

//   const identifyWithSetting(settingId?: string): void {
//     if (settingId) {
//       this.dataService.getSetting(settingId).subscribe((setting) => {
//         const user = this.jwtService.getUser();
//         const data: any = {
//           name: user.name,
//           email: user.email,
//           workspace: user.workspace,
//         };
//         if (setting && setting.workspace) {
//           const workspace = setting.workspace;
//           data['hasSetting'] = 'Yes';
//           data['channel'] = setting.channel.name ?? null;
//           data['topics'] = setting.tags.map((tag: any) => tag.name).join(', ');
//           data['triggerDay'] = DAYS.find((day) => day.key === setting.day)!.val;
//           data['triggerTime'] = setting.time;
//           data['timezone'] = setting.timezone.label ?? null;
//           data['subscriptionExpiry'] = workspace.subscriptionExpiry ?? null;
//           data['replyCount'] = workspace.messageReplies
//             ? workspace.messageReplies.length
//             : 0;
//         } else {
//           data['hasSetting'] = 'No';
//         }
//         window.analytics.identify(user.id, data);
//       });
//     }
//   }

const trackChannel = (channelName: string, channelId: string): void => {
  const user = authService.getUser();
  if (!user) return;

  const data = {
    name: user.name,
    email: user.email,
    workspace: user.workspace,
    channelName,
    channelId,
  };
  window.analytics.track("channel_selected", data);
};

const trackTopics = (topics: string[]): void => {
  const user = authService.getUser();
  if (!user) return;

  const data = {
    name: user.name,
    email: user.email,
    workspace: user.workspace,
    topics: topics.map((topic) => TAGS.find((t) => t._id === topic).name),
  };
  window.analytics.track("topics_selected", data);
};

//   trackTriggerTime(data: any): void {
//     window.analytics.track('time_selected', data);
//   }

const trackSignIn = () => {
  const user = authService.getUser();
  if (!user) return;

  const data = {
    name: user.name,
    email: user.email,
    workspace: user.workspace,
  };
  window.analytics.track("sign_in", data);
};

const trackSignUp = () => {
  const user = authService.getUser();
  if (!user) return;

  const data = {
    name: user.name,
    email: user.email,
    workspace: user.workspace,
  };
  window.analytics.track("sign_up", data);
};

// • Selected Time
// • Updated settings
// • Checked out
// • Logged in

export default Object.freeze({
  identifyUser,
  trackSignIn,
  trackSignUp,
  trackChannel,
  trackTopics,
});
