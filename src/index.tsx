import { connect, IntentCtx, RenderFieldExtensionCtx, ItemType, InitPropertiesAndMethods, RenderItemFormSidebarPanelCtx } from 'datocms-plugin-sdk';
import { render } from './utils/render';
import ConfigScreen from './entrypoints/ConfigScreen';
import DistrictField from './entrypoints/DistrictField'
import DistrictUserField from './entrypoints/DistrictUserField'
import 'datocms-react-ui/styles.css';
import { isDev } from './utils';


connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  manualFieldExtensions(ctx: IntentCtx) {
    return [
      {
        id: 'district-field',
        name: 'District Field' + (isDev ? ' (dev)' : ''),
        type: 'editor',
        fieldTypes: ['link'],
        configurable: false
      },
      {
        id: 'district-user-field',
        name: 'District User Field' + (isDev ? ' (dev)' : ''),
        type: 'editor',
        fieldTypes: ['string'],
        configurable: false
      }
    ]
  },

  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    switch (fieldExtensionId) {
      case 'district-field':
        return render(<DistrictField ctx={ctx} />);
      case 'district-user-field':
        return render(<DistrictUserField ctx={ctx} />);
    }
  }
});
