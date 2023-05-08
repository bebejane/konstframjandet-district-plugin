import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas, SelectField } from 'datocms-react-ui';
import { useEffect, useState } from 'react';
import { buildClient } from '@datocms/cma-client-browser';

export type PropTypes = {
  ctx: RenderFieldExtensionCtx;
};

export type DistrictOption = {
  label: string,
  value: string
}

export default function DistrictField({ ctx }: PropTypes) {

  const [options, setOptions] = useState<DistrictOption[] | undefined>()
  const [value, setValue] = useState<DistrictOption | undefined>()
  const [error, setError] = useState<Error | undefined>()


  useEffect(() => {

    console.log(ctx.currentUserAccessToken)
    const client = buildClient({ apiToken: ctx.currentUserAccessToken as string })

    client.items.list({ filter: { type: 'district' } }).then((districts) => {
      const options = districts.map(({ id, name, email }) => ({ value: id as string, label: name as string, email: email as string }))
      const currentValue = ctx.formValues[ctx.field.attributes.api_key];
      console.log(currentValue)
      setOptions(options)

      if (currentValue)
        setValue(options.find(({ value }) => value === currentValue))
      else {
        //@ts-ignore
        const userEmail = ctx.currentUser.attributes.email
        setValue(options.find(({ email }) => email.toLowerCase() === userEmail))
      }
    }).catch(err => setError(err))

  }, [setOptions, ctx])

  useEffect(() => {
    if (!value || value.value === ctx.formValues[ctx.field.attributes.api_key]) return
    ctx.setFieldValue(ctx.field.attributes.api_key, value?.value)
  }, [value, ctx])

  return (
    <Canvas ctx={ctx}>
      <SelectField
        id="district"
        name="district"
        label=""
        value={value}
        selectInputProps={{ isMulti: false, options }}
        onChange={(newValue) => { setValue(newValue as DistrictOption) }}
      />
      {error && <div>Error: {error.message}</div>}
    </Canvas>
  )

}