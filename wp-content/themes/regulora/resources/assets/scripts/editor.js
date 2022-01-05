wp.domReady(() => {
  wp.blocks.registerBlockStyle('core/group', [
    {
      name: 'faq-item',
      label: 'FAQs Item',
    },
  ]);

  wp.blocks.registerBlockStyle('core/button', [
    {
      name: 'short',
      label: 'Short',
    },
    {
      name: 'medium',
      label: 'Medium',
    },
    {
      name: 'wide',
      label: 'Wide',
    },
  ]);

  wp.blocks.registerBlockStyle('core/spacer', [
    {
      name: 'spacer-110',
      label: 'Spacer-110',
    },
    {
      name: 'spacer-60',
      label: 'Spacer-60',
    },
  ]);

  wp.blocks.registerBlockStyle('core/paragraph', [
    {
      name: 'narrow',
      label: 'Narrow',
    },
    {
      name: 'border-bottom',
      label: 'Border Bottom',
    },
  ]);

  wp.blocks.registerBlockStyle('core/separator', [
    {
      name: 'gray-separator',
      label: 'Gray Line',
    },
  ]);

  // wp.blocks.registerBlockStyle('core/cover', [
  //   {
  //     name: 'text-left-with-overlay',
  //     label: 'Text on the Left',
  //   },
  // ]);
  //
  wp.blocks.registerBlockStyle('core/image', [
    {
      name: 'absolute-to-bottom',
      label: 'Overlay to top',
    },
    {
      name: 'icon-with-text',
      label: 'Icon With Text',
    },
    {
      name: 'icon-with-text wide',
      label: 'Icon With Text Wide',
    },
  ]);
  
  wp.blocks.registerBlockStyle('core/list', [
    {
      name: 'with-icon',
      label: 'With Icon',
    },
  ]);
});
