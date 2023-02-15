import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas, SelectField } from 'datocms-react-ui';
import { useEffect, useState } from 'react';
import { buildClient } from '@datocms/cma-client-browser';

export type PropTypes = {
  ctx: RenderFieldExtensionCtx;
};

export type DistrictUserOption = {
  label: string,
  value: string
}

export default function DistrictUserField({ ctx }: PropTypes) {

  const [options, setOptions] = useState<DistrictUserOption[] | undefined>()
  const [value, setValue] = useState<DistrictUserOption | undefined>()
  const [error, setError] = useState<Error | undefined>()


  useEffect(() => {

    const users = ctx.users
    console.log(ctx)
    console.log(ctx.users)
    /*
    const options = users.map(({ id, name, email }) => ({ value: id as string, label: name as string, email: email as string }))

    setOptions(options)

    if (currentValue)
      setValue(options.find(({ value }) => value === currentValue))
    else {
      //@ts-ignore
      const userEmail = ctx.currentUser.attributes.email
      setValue(options.find(({ email }) => email.toLowerCase() === userEmail))
    }
    */


  }, [setOptions])

  useEffect(() => {
    ctx.setFieldValue(ctx.field.attributes.api_key, value?.value)
  }, [value])

  console.log(ctx)
  return (
    <Canvas ctx={ctx}>
      <SelectField
        id="district-user"
        name="district-user"
        label=""
        value={value}
        selectInputProps={{ isMulti: false, options }}
        onChange={(newValue) => { setValue(newValue as DistrictUserOption) }}
      />
      {error && <div>Error: {error.message}</div>}
    </Canvas>
  )

}