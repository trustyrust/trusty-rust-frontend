<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" :persistent="true">
    <q-card class="q-dialog-plugin">
      <q-tabs
        v-model="tabLogin"
        no-caps
        inline-label
        class="shadow-2"
        active-color="primary"
        indicator-color="secondary"
        align="justify"
        narrow-indicator
      >
        <q-tab class="text-cyan" name="login" icon="login" label="Log In" />
        <q-tab class="text-cyan" name="signup" icon="person_add" label="Sign Up" />
      </q-tabs>

      <q-card-section>
        <div class="text-h6">
          Trusty Rust Blog: <span class="text-h6" style="text-transform: capitalize">{{ tabLogin }}</span>
        </div>
      </q-card-section>
      <q-separator inset />

      <q-tab-panels v-model="tabLogin" animated>
        <q-tab-panel name="login">
          <q-form @submit="onLogin" class="q-gutter-md q-pt-md">
            <q-input
              filled
              v-model="loginEmail"
              label="Email"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
              autofocus
            />

            <q-input
              filled
              type="password"
              v-model="loginPassword"
              label="Password"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />
            <div style="text-align: right">
              <q-btn flat color="secondary" @click="onForgotPassword" no-caps no-wrap label="Forgot Password?" />
            </div>

            <q-separator class="q-my-lg" />
            <div class="row full-width">
              <q-btn class="col q-mr-sm" icon="close" flat label="Cancel" color="secondary" @click="onClose" />
              <q-btn
                class="col q-ml-sm"
                :disable="isRequesting"
                :loading="isRequesting"
                icon="login"
                label="Log In"
                type="submit"
                color="secondary"
              />
            </div>
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="signup">
          <q-form @submit="onRegister">
            <q-input filled v-model="registerEmail" label="Email" lazy-rules :rules="[isValidEmailRegistration]" autofocus />
            <br />
            <q-input
              filled
              v-model="registerUsername"
              label="Username"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />
            <br />
            <q-input
              filled
              label="Password"
              type="password"
              v-model="registerPassword"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />
            <br />
            <q-input
              filled
              label="Confirm Password"
              type="password"
              v-model="registerPasswordRepeat"
              lazy-rules
              :rules="[(val) => (val !== null && val === registerPassword) || 'Passwords Do Not Match']"
            />

            <q-separator class="q-my-lg" />
            <div class="row full-width">
              <q-btn class="col q-mr-sm" icon="close" flat label="Cancel" color="secondary" @click="onClose" />
              <q-btn
                class="col q-ml-sm"
                :disable="isRequesting"
                :loading="isRequesting"
                icon="person_add"
                label="Sign Up"
                type="submit"
                color="secondary"
              />
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import promisify from 'pify'
import jsend from 'jsend'
import { isValidEmail, getPassword } from 'src/boot/preload'

export default {
  props: {
    loginType: { type: String, default: 'signup' },
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props, context) {
    const $q = useQuasar()
    const store = useStore()
    const app = getCurrentInstance()
    const api = app.appContext.config.globalProperties.$api
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const tabLogin = ref(props.loginType)
    const loginEmail = ref(null)
    const loginPassword = ref(null)

    const registerEmail = ref(null)
    const registerUsername = ref(null)
    const registerPassword = ref(null)
    const registerPasswordRepeat = ref(null)
    const isRequesting = ref(false)

    return {
      tabLogin,
      loginEmail,
      loginPassword,
      dialogRef,
      onDialogHide,
      registerEmail,
      registerUsername,
      registerPassword,
      registerPasswordRepeat,
      isRequesting,

      onClose: () => {
        onDialogCancel()
      },
      isValidEmailRegistration: () => isValidEmail(registerEmail.value),
      onLogin: async () => {
        try {
          isRequesting.value = true

          const jUserInfo = await api({
            method: 'POST',
            url: '/api/auth/login',
            data: {
              email: loginEmail.value,
              pass: loginPassword.value,
            },
          })

          const userInfo = await promisify(jsend.forward)(jUserInfo)
          store.dispatch('setUserAuth', userInfo)

          console.log('userInfo', userInfo)
          context.emit('hide', {})
        } catch (error) {
          $q.notify({ type: 'negative', message: error.message })
        } finally {
          isRequesting.value = false
        }
      },
      onRegister: async () => {
        try {
          const pass = await getPassword(registerPassword.value, $q)
          try {
            isRequesting.value = true
            const jUserInfo = await api({
              method: 'POST',
              url: '/api/auth/register',
              data: {
                email: registerEmail.value,
                username: registerUsername.value,
                pass,
              },
            })
            const userInfo = await promisify(jsend.forward)(jUserInfo)
            store.dispatch('setUserAuth', userInfo)

            console.log('userInfo', userInfo)
            // context.emit('hide', {})
            onDialogOK()
          } catch (error) {
            if (error.message.indexOf('duplicate')) {
              $q.notify({
                type: 'negative',
                message: 'Already Registered with this Email. Use Forgot Password link to reset your password',
              })
            } else {
              $q.notify({ type: 'negative', message: error.message })
            }
          } finally {
            isRequesting.value = false
          }
        } catch (error) {
          // This is simply a close from the password warning dialog. Safe to ignore
        }
      },
      onForgotPassword: () => {
        console.log('onForgotPassword')
      },
    }
  },
}
</script>
