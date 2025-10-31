
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
// import { login, signup } from './actions'
import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SignUpAlert from './signUpAlert'

export default function LoginPage() {
  return (
    <>
      <SignUpAlert />
      <form>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Log In</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email:</FieldLabel>
                  <Input id="email" name="email" type="email" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password:</FieldLabel>
                  <Input id="password" name="password" type="password" required />
                </Field>
              </FieldGroup>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* <Button formAction={signup}>Sign up</Button> */}
              <Button formAction={login}>Log in</Button>
            </div>
          </FieldSet>
        </FieldGroup>
      </form>
    </>
  )
}
