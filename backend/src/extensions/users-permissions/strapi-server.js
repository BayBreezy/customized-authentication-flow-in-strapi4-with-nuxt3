const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");

module.exports = (plugin) => {
  plugin.controllers.auth.otp = async (ctx) => {
    try {
      const { otp } = ctx.request.body;
      if (!otp) return ctx.badRequest("OTP is required");

      // fin dthe user base don otp
      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { otp },
        });
      if (!user) return ctx.badRequest("Invalid Credentials");
      // create a jwt token
      const token = strapi.plugins["users-permissions"].services.jwt.issue({
        id: user.id,
      });
      // update the user's lastLoggedIn & otp
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        user.id,
        {
          data: {
            lastLoggedIn: new Date(),
            otp: null,
          },
        }
      );
      // send login notification
      strapi.plugins["email"].services.email.send({
        to: user.email,
        from: "some-app@no-reply.com",
        replyTo: "some-app@no-reply.com",
        subject: "Login Notification",
        text: "Someone just logged in to your account!",
        html: "<h1>Someone just logged in to your account!</h1>",
      });

      ctx.send({ jwt: token });
    } catch (error) {
      ctx.badRequest(error);
    }
  };

  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/auth/otp",
    handler: "auth.otp",
    config: {
      prefix: "",
      auth: false,
    },
  });

  const originalAuthRegister = plugin.controllers.auth.register;
  const originalAuthLogin = plugin.controllers.auth.callback;

  plugin.controllers.auth.register = async (ctx) => {
    try {
      await originalAuthRegister(ctx);
      // Send welcome email
      strapi.plugins["email"].services.email.send({
        to: ctx.response.body.user.email,
        from: "some-app@no-reply.com",
        replyTo: "some-app@no-reply.com",
        subject: "Welcome to our app!",
        text: "Welcome to our app!",
        html: "<h1>Welcome to our app!</h1>",
      });
    } catch (error) {
      ctx.badRequest(error);
    }
  };

  plugin.controllers.auth.callback = async (ctx) => {
    try {
      await originalAuthLogin(ctx);
      const otp = uuidv4();
      // check when the user last logged in
      let shouldSendEmail = false;

      if (!ctx.response.body.user.lastLoggedIn) {
        shouldSendEmail = true;
      }
      // check if the last log in date exist and is greater than 1 day
      if (ctx.response.body.user.lastLoggedIn) {
        const lastLoggedIn = dayjs(ctx.response.body.user.lastLoggedIn);
        const now = dayjs();
        const diff = now.diff(lastLoggedIn, "day");
        if (diff >= 1) {
          shouldSendEmail = true;
        }
      }

      if (shouldSendEmail) {
        // update the user's otp
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          ctx.response.body.user.id,
          {
            data: {
              otp,
            },
          }
        );

        // Send OTP email
        strapi.plugins["email"].services.email.send({
          to: ctx.response.body.user.email,
          from: "some-app@no-reply.com",
          replyTo: "some-app@no-reply.com",
          subject: "Your OTP is " + otp,
          text: "Your OTP is " + otp,
          html: "<h1>Your OTP is " + otp + "</h1>",
        });

        return ctx.send({
          message: "OTP sent to your email",
        });
      }
    } catch (error) {
      ctx.badRequest(error);
    }
  };
  return plugin;
};
