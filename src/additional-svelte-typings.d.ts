declare namespace svelteHTML {
	interface SVGAttributes<T extends EventTarget> extends AriaAttributes, DOMAttributes<T> {
		'xmlns:cc'?: string;
		'xmlns:dc'?: string;
		'xmlns:rdf'?: string;
		'xmlns:svg'?: string;
		'xmlns:sodipodi'?: string;
		'xmlns:inkscape'?: string;
		'sodipodi:docname'?: string;
		'inkscape:version'?: string;
		'inkscape:label'?: string;
		'inkscape:groupmode'?: string;
		'inkscape:connector-curvature'?: string;
	}
}
