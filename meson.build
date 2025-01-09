project('hyprshell',
  version: '0.1',
  meson_version: '>= 0.60.0',
  license: 'GPL-3.0-only'
)

#i18n = import('i18n')

prefix = get_option('prefix')
pkgdatadir = prefix / get_option('datadir') / meson.project_name()
bindir = prefix / get_option('bindir')

custom_target(
  command: [
    find_program('ags'),
    'bundle',
    '--define', 'DATADIR="' + pkgdatadir + '"',
    '--root', meson.project_source_root(),
    meson.project_source_root() / 'app.ts',
    meson.project_name(),
  ],
  output: [meson.project_name()],
  input: files('app.ts'),
  install: true,
  install_dir: bindir,
)

#subdir('po')
