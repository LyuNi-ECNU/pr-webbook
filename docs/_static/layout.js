(function () {
	const ROOT = document.documentElement;
	let cleanupDrag = null;
	const SIDEBAR_CONFIGS = [
		{
			key: "primary",
			selector: ".bd-sidebar-primary",
			storageKey: "book-primary-sidebar-width",
			cssVar: "--book-sidebar-primary-width",
			minWidth: 224,
			maxWidth: 440,
			mediaQuery: window.matchMedia("(min-width: 992px)"),
			ariaLabel: "Resize left sidebar",
			expandKey: "ArrowRight",
			shrinkKey: "ArrowLeft",
			getHandleLeft(rect) {
				return rect.right;
			},
			getWidthFromPointer(rect, clientX) {
				return clientX - rect.left;
			},
		},
		{
			key: "secondary",
			selector: ".bd-sidebar-secondary",
			storageKey: "book-secondary-sidebar-width",
			cssVar: "--book-sidebar-secondary-width",
			minWidth: 160,
			maxWidth: 360,
			mediaQuery: window.matchMedia("(min-width: 1200px)"),
			ariaLabel: "Resize contents sidebar",
			expandKey: "ArrowLeft",
			shrinkKey: "ArrowRight",
			getHandleLeft(rect) {
				return rect.left;
			},
			getWidthFromPointer(rect, clientX) {
				return rect.right - clientX;
			},
		},
	];

	function clampWidth(config, width) {
		return Math.min(config.maxWidth, Math.max(config.minWidth, Math.round(width)));
	}

	function setSidebarWidth(config, width) {
		ROOT.style.setProperty(config.cssVar, `${clampWidth(config, width)}px`);
	}

	function loadStoredWidth(config) {
		const stored = window.localStorage.getItem(config.storageKey);
		if (!stored) {
			return;
		}

		const parsed = Number.parseInt(stored, 10);
		if (!Number.isFinite(parsed)) {
			window.localStorage.removeItem(config.storageKey);
			return;
		}

		setSidebarWidth(config, parsed);
	}

	function saveWidth(config, width) {
		window.localStorage.setItem(config.storageKey, String(clampWidth(config, width)));
	}

	function applyHandleValue(config, handle, width) {
		handle.setAttribute("aria-valuenow", String(clampWidth(config, width)));
	}

	function createHandle(config, width) {
		const handle = document.createElement("button");
		handle.type = "button";
		handle.className = `sidebar-resizer sidebar-resizer--${config.key}`;
		handle.setAttribute("aria-label", config.ariaLabel);
		handle.setAttribute("aria-orientation", "vertical");
		handle.setAttribute("aria-valuemin", String(config.minWidth));
		handle.setAttribute("aria-valuemax", String(config.maxWidth));
		handle.setAttribute("role", "separator");
		applyHandleValue(config, handle, width);
		return handle;
	}

	function updateHandlePosition(config, sidebar, handle) {
		const rect = sidebar.getBoundingClientRect();
		handle.style.left = `${Math.round(config.getHandleLeft(rect))}px`;
		handle.hidden =
			!config.mediaQuery.matches ||
			rect.right <= 0 ||
			rect.left >= window.innerWidth;
	}

	function stopDragging(handle) {
		if (cleanupDrag) {
			cleanupDrag();
			cleanupDrag = null;
		}

		handle.classList.remove("is-dragging");
		document.body.classList.remove("is-resizing-sidebar");
	}

	function beginDragging(config, sidebar, handle, event, kind) {
		if (!config.mediaQuery.matches || cleanupDrag || event.button !== 0) {
			return;
		}

		event.preventDefault();
		handle.classList.add("is-dragging");
		document.body.classList.add("is-resizing-sidebar");

		const pointerId = kind === "pointer" ? event.pointerId : null;
		const moveEventName = kind === "pointer" ? "pointermove" : "mousemove";
		const upEventName = kind === "pointer" ? "pointerup" : "mouseup";
		const cancelEventName = kind === "pointer" ? "pointercancel" : null;

		const onMove = (moveEvent) => {
			if (pointerId !== null && moveEvent.pointerId !== pointerId) {
				return;
			}

			const rect = sidebar.getBoundingClientRect();
			const width = clampWidth(config, config.getWidthFromPointer(rect, moveEvent.clientX));
			setSidebarWidth(config, width);
			saveWidth(config, width);
			applyHandleValue(config, handle, width);
			updateHandlePosition(config, sidebar, handle);
		};

		const onUp = (upEvent) => {
			if (pointerId !== null && upEvent.pointerId !== pointerId) {
				return;
			}

			stopDragging(handle);
		};

		window.addEventListener(moveEventName, onMove);
		window.addEventListener(upEventName, onUp);

		if (cancelEventName) {
			window.addEventListener(cancelEventName, onUp);
		}

		cleanupDrag = () => {
			window.removeEventListener(moveEventName, onMove);
			window.removeEventListener(upEventName, onUp);

			if (cancelEventName) {
				window.removeEventListener(cancelEventName, onUp);
			}
		};
	}

	function enableDragging(config, sidebar, handle) {
		handle.addEventListener("pointerdown", (event) => {
			beginDragging(config, sidebar, handle, event, "pointer");
		});

		handle.addEventListener("mousedown", (event) => {
			beginDragging(config, sidebar, handle, event, "mouse");
		});

		handle.addEventListener("keydown", (event) => {
			if (!config.mediaQuery.matches) {
				return;
			}

			const currentWidth = sidebar.getBoundingClientRect().width;
			const step = event.shiftKey ? 24 : 12;
			let nextWidth = null;

			if (event.key === config.shrinkKey) {
				nextWidth = currentWidth - step;
			}

			if (event.key === config.expandKey) {
				nextWidth = currentWidth + step;
			}

			if (nextWidth === null) {
				return;
			}

			event.preventDefault();
			setSidebarWidth(config, nextWidth);
			saveWidth(config, nextWidth);
			applyHandleValue(config, handle, nextWidth);
			updateHandlePosition(config, sidebar, handle);
		});
	}

	function ensureSidebarResizer(config) {
		const sidebar = document.querySelector(config.selector);
		if (!sidebar) {
			document.querySelector(`.sidebar-resizer--${config.key}`)?.remove();
			return;
		}

		if (!config.mediaQuery.matches) {
			document.querySelector(`.sidebar-resizer--${config.key}`)?.remove();
			return;
		}

		loadStoredWidth(config);

		let handle = document.querySelector(`.sidebar-resizer--${config.key}`);
		if (!handle) {
			handle = createHandle(config, sidebar.getBoundingClientRect().width);
			document.body.appendChild(handle);
			enableDragging(config, sidebar, handle);
		}

		applyHandleValue(config, handle, sidebar.getBoundingClientRect().width);
		updateHandlePosition(config, sidebar, handle);
	}

	function init() {
		SIDEBAR_CONFIGS.forEach((config) => ensureSidebarResizer(config));
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init, { once: true });
	} else {
		init();
	}

	SIDEBAR_CONFIGS.forEach((config) => {
		config.mediaQuery.addEventListener("change", () => {
			if (!config.mediaQuery.matches) {
				document.querySelector(`.sidebar-resizer--${config.key}`)?.remove();
				return;
			}

			ensureSidebarResizer(config);
		});
	});

	window.addEventListener("resize", init);
	window.addEventListener("scroll", init, { passive: true });
})();
