import { Injectable } from "@angular/core";
import { JwtService } from "src/app/core/services/jwt.service";
import { DataService } from "./data.service";
import { DAYS } from "../constants/days";
import authService from "./auth.service";

const identifyUser = () => {
  const user = authService.getUser();
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

//   trackChannel(data: any): void {
//     window.analytics.track('channel_selected', data);
//   }

//   trackTopics(data: any): void {
//     window.analytics.track('topics_selected', data);
//   }

//   trackTriggerTime(data: any): void {
//     window.analytics.track('time_selected', data);
//   }

const trackSignIn = () => {
  const user = authService.getUser();
  const data = {
    name: user.name,
    email: user.email,
    workspace: user.workspace,
  };
  window.analytics.track("sign_in", data);
};

const trackSignUp = () => {
  const user = authService.getUser();
  const data = {
    name: user.name,
    email: user.email,
    workspace: user.workspace,
  };
  window.analytics.track("sign_up", data);
};

export default Object.freeze({
  identifyUser,
  trackSignIn,
  trackSignUp,
});
