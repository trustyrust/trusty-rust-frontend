<template>
  <q-page class="justify-center" style="min-width: 300px">
    <div class="q-mt-lg">
      <q-card v-if="isSuccess" class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">Successfully Reset Your Password</div>
          <div class="text-subtitle2">Please try to Login Again</div>
        </q-card-section>
      </q-card>
      <q-form v-else @submit="onPasswordReset" class="full-width">
        <div class="text-h4">Reset Password</div>
        <q-input
          filled
          label="Password"
          type="password"
          v-model="txtPassword"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <br />
        <q-input
          filled
          label="Confirm Password"
          type="password"
          v-model="txtPasswordRepeat"
          lazy-rules
          :rules="[(val) => (val !== null && val === txtPassword) || 'Passwords Do Not Match']"
        />
        <q-btn
          class="col q-ml-sm full-width"
          :disable="isRequesting"
          :loading="isRequesting"
          icon="person_add"
          label="Reset Password"
          type="submit"
          color="secondary"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const app = getCurrentInstance()
    const api = app.appContext.config.globalProperties.$api

    const isSuccess = ref(false)
    const isRequesting = ref(false)
    const txtPassword = ref(null)
    const txtPasswordRepeat = ref(null)

    const { hmac_code } = router.currentRoute.value.params

    return {
      isSuccess,
      isRequesting,
      txtPassword,
      txtPasswordRepeat,
      onPasswordReset: async () => {
        try {
          isRequesting.value = true
          await api({
            method: 'POST',
            url: '/api/auth/password_forgot',
            data: {
              password: txtPassword.value,
              hmac_code,
            },
          })
          // $q.notify({ type: 'positive', message: 'Your password has been reset. Please try to login again.' })
          isSuccess.value = true
        } catch (error) {
          $q.notify({ type: 'negative', message: error.message })
        } finally {
          isRequesting.value = false
        }
      },
    }
  },
}
</script>
