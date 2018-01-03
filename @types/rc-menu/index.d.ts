/** Declaration file generated by dts-gen */

export class Divider {
    constructor(props: any, context: any, updater: any);

    componentDidMount(): void;

    componentWillUnmount(): void;

    render(): any;

    static defaultProps: {
        disabled: boolean;
    };

    static displayName: string;

    static getDefaultProps(): any;

}

export class Item {
    constructor(props: any, context: any, updater: any);

    componentDidMount(): void;

    componentWillUnmount(...args: any[]): void;

    getActiveClassName(): any;

    getDisabledClassName(): any;

    getPrefixCls(): any;

    getSelectedClassName(): any;

    isSelected(): any;

    onClick(e: any): void;

    onKeyDown(e: any): any;

    onMouseEnter(e: any): void;

    onMouseLeave(e: any): void;

    render(): any;

    static displayName: string;

    static getDefaultProps(): any;

    static isMenuItem: number;

}

export class ItemGroup {
    constructor(props: any, context: any, updater: any);

    componentDidMount(): void;

    componentWillUnmount(): void;

    render(): any;

    renderInnerMenuItem(item: any, subIndex: any): any;

    static defaultProps: {
        disabled: boolean;
    };

    static displayName: string;

    static getDefaultProps(): any;

    static isMenuItemGroup: boolean;

}

export class MenuItem {
    constructor(props: any, context: any, updater: any);

    componentDidMount(): void;

    componentWillUnmount(...args: any[]): void;

    getActiveClassName(): any;

    getDisabledClassName(): any;

    getPrefixCls(): any;

    getSelectedClassName(): any;

    isSelected(): any;

    onClick(e: any): void;

    onKeyDown(e: any): any;

    onMouseEnter(e: any): void;

    onMouseLeave(e: any): void;

    render(): any;

    static displayName: string;

    static getDefaultProps(): any;

    static isMenuItem: number;

}

export class MenuItemGroup {
    constructor(props: any, context: any, updater: any);

    componentDidMount(): void;

    componentWillUnmount(): void;

    render(): any;

    renderInnerMenuItem(item: any, subIndex: any): any;

    static defaultProps: {
        disabled: boolean;
    };

    static displayName: string;

    static getDefaultProps(): any;

    static isMenuItemGroup: boolean;

}

export class SubMenu {
    constructor(props: any, context: any, updater: any);

    addKeyPath(info: any): any;

    componentDidMount(...args: any[]): void;

    componentDidUpdate(): void;

    componentWillUnmount(...args: any[]): void;

    getActiveClassName(): any;

    getDisabledClassName(): any;

    getInitialState(): any;

    getOpenClassName(): any;

    getPrefixCls(): any;

    getSelectedClassName(): any;

    isChildrenSelected(): any;

    isOpen(): any;

    onDeselect(info: any): void;

    onDestroy(key: any): void;

    onKeyDown(e: any): any;

    onMouseEnter(e: any): void;

    onMouseLeave(e: any): void;

    onOpenChange(e: any): void;

    onPopupVisibleChange(visible: any): void;

    onSelect(info: any): void;

    onSubMenuClick(info: any): void;

    onTitleClick(e: any): void;

    onTitleMouseEnter(domEvent: any): void;

    onTitleMouseLeave(e: any): void;

    render(): any;

    renderChildren(children: any): any;

    saveMenuInstance(c: any): void;

    saveSubMenuTitle(subMenuTitle: any): void;

    triggerOpenChange(open: any, type: any): void;

    static displayName: string;

    static getDefaultProps(): any;

    static isSubMenu: number;

}

export namespace Divider {
    namespace getDefaultProps {
        const isReactClassApproved: {
        };

        const prototype: {
        };

    }

    namespace propTypes {
        function className(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function rootPrefixCls(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        namespace className {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace rootPrefixCls {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

    }

    namespace prototype {
        const childContextTypes: any;

        const componentDidUpdate: any;

        const componentWillMount: any;

        const componentWillReceiveProps: any;

        const componentWillUpdate: any;

        const contextTypes: any;

        const getChildContext: any;

        const getDefaultProps: any;

        const getInitialState: any;

        const isReactComponent: {
        };

        const mixins: any;

        const propTypes: any;

        const shouldComponentUpdate: any;

        const statics: any;

        const updateComponent: any;

        function componentDidMount(): void;

        function componentWillUnmount(): void;

        function forceUpdate(callback: any): void;

        function isMounted(): any;

        function render(): any;

        function replaceState(newState: any, callback: any): void;

        function setState(partialState: any, callback: any): void;

        namespace componentDidMount {
            const prototype: {
            };

        }

        namespace componentWillUnmount {
            const prototype: {
            };

        }

        namespace forceUpdate {
            const prototype: {
            };

        }

        namespace isMounted {
            const prototype: {
            };

        }

        namespace render {
            const displayName: string;

            const prototype: {
            };

        }

        namespace replaceState {
            const prototype: {
            };

        }

        namespace setState {
            const prototype: {
            };

        }

    }

}

export namespace Item {
    namespace defaultProps {
        function onMouseEnter(): void;

        function onMouseLeave(): void;

        function onSelect(): void;

        namespace onMouseEnter {
            const prototype: {
            };

        }

        namespace onMouseLeave {
            const prototype: {
            };

        }

        namespace onSelect {
            const prototype: {
            };

        }

    }

    namespace getDefaultProps {
        const isReactClassApproved: {
        };

        const prototype: {
        };

    }

    namespace propTypes {
        function active(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function disabled(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function eventKey(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onClick(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onDeselect(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onDestroy(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onItemHover(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onMouseEnter(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onMouseLeave(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onSelect(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function parentMenu(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function rootPrefixCls(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function selectedKeys(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function title(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        namespace active {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace children {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace disabled {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace eventKey {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onClick {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onDeselect {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onDestroy {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onItemHover {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onMouseEnter {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onMouseLeave {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onSelect {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace parentMenu {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace rootPrefixCls {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace selectedKeys {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace title {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

    }

    namespace prototype {
        const childContextTypes: any;

        const componentDidUpdate: any;

        const componentWillMount: any;

        const componentWillReceiveProps: any;

        const componentWillUpdate: any;

        const contextTypes: any;

        const getChildContext: any;

        const getDefaultProps: any;

        const getInitialState: any;

        const isReactComponent: {
        };

        const mixins: any;

        const propTypes: any;

        const shouldComponentUpdate: any;

        const statics: any;

        const updateComponent: any;

        function componentDidMount(): void;

        function componentWillUnmount(...args: any[]): void;

        function forceUpdate(callback: any): void;

        function getActiveClassName(): any;

        function getDisabledClassName(): any;

        function getPrefixCls(): any;

        function getSelectedClassName(): any;

        function isMounted(): any;

        function isSelected(): any;

        function onClick(e: any): void;

        function onKeyDown(e: any): any;

        function onMouseEnter(e: any): void;

        function onMouseLeave(e: any): void;

        function render(): any;

        function replaceState(newState: any, callback: any): void;

        function setState(partialState: any, callback: any): void;

        namespace componentDidMount {
            const prototype: {
            };

        }

        namespace componentWillUnmount {
            const prototype: {
            };

        }

        namespace forceUpdate {
            const prototype: {
            };

        }

        namespace getActiveClassName {
            const prototype: {
            };

        }

        namespace getDisabledClassName {
            const prototype: {
            };

        }

        namespace getPrefixCls {
            const prototype: {
            };

        }

        namespace getSelectedClassName {
            const prototype: {
            };

        }

        namespace isMounted {
            const prototype: {
            };

        }

        namespace isSelected {
            const prototype: {
            };

        }

        namespace onClick {
            const prototype: {
            };

        }

        namespace onKeyDown {
            const prototype: {
            };

        }

        namespace onMouseEnter {
            const prototype: {
            };

        }

        namespace onMouseLeave {
            const prototype: {
            };

        }

        namespace render {
            const displayName: string;

            const prototype: {
            };

        }

        namespace replaceState {
            const prototype: {
            };

        }

        namespace setState {
            const prototype: {
            };

        }

    }

}

export namespace ItemGroup {
    namespace getDefaultProps {
        const isReactClassApproved: {
        };

        const prototype: {
        };

    }

    namespace propTypes {
        function className(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function index(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function renderMenuItem(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function rootPrefixCls(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        namespace className {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace index {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace renderMenuItem {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace rootPrefixCls {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

    }

    namespace prototype {
        const childContextTypes: any;

        const componentDidUpdate: any;

        const componentWillMount: any;

        const componentWillReceiveProps: any;

        const componentWillUpdate: any;

        const contextTypes: any;

        const getChildContext: any;

        const getDefaultProps: any;

        const getInitialState: any;

        const isReactComponent: {
        };

        const mixins: any;

        const propTypes: any;

        const shouldComponentUpdate: any;

        const statics: any;

        const updateComponent: any;

        function componentDidMount(): void;

        function componentWillUnmount(): void;

        function forceUpdate(callback: any): void;

        function isMounted(): any;

        function render(): any;

        function renderInnerMenuItem(item: any, subIndex: any): any;

        function replaceState(newState: any, callback: any): void;

        function setState(partialState: any, callback: any): void;

        namespace componentDidMount {
            const prototype: {
            };

        }

        namespace componentWillUnmount {
            const prototype: {
            };

        }

        namespace forceUpdate {
            const prototype: {
            };

        }

        namespace isMounted {
            const prototype: {
            };

        }

        namespace render {
            const displayName: string;

            const prototype: {
            };

        }

        namespace renderInnerMenuItem {
            const prototype: {
            };

        }

        namespace replaceState {
            const prototype: {
            };

        }

        namespace setState {
            const prototype: {
            };

        }

    }

}

export namespace MenuItem {
    namespace defaultProps {
        function onMouseEnter(): void;

        function onMouseLeave(): void;

        function onSelect(): void;

        namespace onMouseEnter {
            const prototype: {
            };

        }

        namespace onMouseLeave {
            const prototype: {
            };

        }

        namespace onSelect {
            const prototype: {
            };

        }

    }

    namespace getDefaultProps {
        const isReactClassApproved: {
        };

        const prototype: {
        };

    }

    namespace propTypes {
        function active(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function disabled(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function eventKey(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onClick(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onDeselect(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onDestroy(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onItemHover(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onMouseEnter(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onMouseLeave(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onSelect(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function parentMenu(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function rootPrefixCls(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function selectedKeys(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function title(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        namespace active {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace children {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace disabled {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace eventKey {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onClick {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onDeselect {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onDestroy {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onItemHover {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onMouseEnter {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onMouseLeave {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onSelect {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace parentMenu {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace rootPrefixCls {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace selectedKeys {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace title {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

    }

    namespace prototype {
        const childContextTypes: any;

        const componentDidUpdate: any;

        const componentWillMount: any;

        const componentWillReceiveProps: any;

        const componentWillUpdate: any;

        const contextTypes: any;

        const getChildContext: any;

        const getDefaultProps: any;

        const getInitialState: any;

        const isReactComponent: {
        };

        const mixins: any;

        const propTypes: any;

        const shouldComponentUpdate: any;

        const statics: any;

        const updateComponent: any;

        function componentDidMount(): void;

        function componentWillUnmount(...args: any[]): void;

        function forceUpdate(callback: any): void;

        function getActiveClassName(): any;

        function getDisabledClassName(): any;

        function getPrefixCls(): any;

        function getSelectedClassName(): any;

        function isMounted(): any;

        function isSelected(): any;

        function onClick(e: any): void;

        function onKeyDown(e: any): any;

        function onMouseEnter(e: any): void;

        function onMouseLeave(e: any): void;

        function render(): any;

        function replaceState(newState: any, callback: any): void;

        function setState(partialState: any, callback: any): void;

        namespace componentDidMount {
            const prototype: {
            };

        }

        namespace componentWillUnmount {
            const prototype: {
            };

        }

        namespace forceUpdate {
            const prototype: {
            };

        }

        namespace getActiveClassName {
            const prototype: {
            };

        }

        namespace getDisabledClassName {
            const prototype: {
            };

        }

        namespace getPrefixCls {
            const prototype: {
            };

        }

        namespace getSelectedClassName {
            const prototype: {
            };

        }

        namespace isMounted {
            const prototype: {
            };

        }

        namespace isSelected {
            const prototype: {
            };

        }

        namespace onClick {
            const prototype: {
            };

        }

        namespace onKeyDown {
            const prototype: {
            };

        }

        namespace onMouseEnter {
            const prototype: {
            };

        }

        namespace onMouseLeave {
            const prototype: {
            };

        }

        namespace render {
            const displayName: string;

            const prototype: {
            };

        }

        namespace replaceState {
            const prototype: {
            };

        }

        namespace setState {
            const prototype: {
            };

        }

    }

}

export namespace MenuItemGroup {
    namespace getDefaultProps {
        const isReactClassApproved: {
        };

        const prototype: {
        };

    }

    namespace propTypes {
        function className(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function index(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function renderMenuItem(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function rootPrefixCls(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        namespace className {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace index {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace renderMenuItem {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace rootPrefixCls {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

    }

    namespace prototype {
        const childContextTypes: any;

        const componentDidUpdate: any;

        const componentWillMount: any;

        const componentWillReceiveProps: any;

        const componentWillUpdate: any;

        const contextTypes: any;

        const getChildContext: any;

        const getDefaultProps: any;

        const getInitialState: any;

        const isReactComponent: {
        };

        const mixins: any;

        const propTypes: any;

        const shouldComponentUpdate: any;

        const statics: any;

        const updateComponent: any;

        function componentDidMount(): void;

        function componentWillUnmount(): void;

        function forceUpdate(callback: any): void;

        function isMounted(): any;

        function render(): any;

        function renderInnerMenuItem(item: any, subIndex: any): any;

        function replaceState(newState: any, callback: any): void;

        function setState(partialState: any, callback: any): void;

        namespace componentDidMount {
            const prototype: {
            };

        }

        namespace componentWillUnmount {
            const prototype: {
            };

        }

        namespace forceUpdate {
            const prototype: {
            };

        }

        namespace isMounted {
            const prototype: {
            };

        }

        namespace render {
            const displayName: string;

            const prototype: {
            };

        }

        namespace renderInnerMenuItem {
            const prototype: {
            };

        }

        namespace replaceState {
            const prototype: {
            };

        }

        namespace setState {
            const prototype: {
            };

        }

    }

}

export namespace SubMenu {
    namespace defaultProps {
        const title: string;

        function onMouseEnter(): void;

        function onMouseLeave(): void;

        function onTitleClick(): void;

        function onTitleMouseEnter(): void;

        function onTitleMouseLeave(): void;

        namespace onMouseEnter {
            const prototype: {
            };

        }

        namespace onMouseLeave {
            const prototype: {
            };

        }

        namespace onTitleClick {
            const prototype: {
            };

        }

        namespace onTitleMouseEnter {
            const prototype: {
            };

        }

        namespace onTitleMouseLeave {
            const prototype: {
            };

        }

    }

    namespace getDefaultProps {
        const isReactClassApproved: {
        };

        const prototype: {
        };

    }

    namespace propTypes {
        function active(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function eventKey(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function multiple(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onClick(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onDeselect(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onDestroy(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onItemHover(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onMouseEnter(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onMouseLeave(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onOpenChange(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onSelect(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onTitleClick(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onTitleMouseEnter(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function onTitleMouseLeave(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function openKeys(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function parentMenu(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function rootPrefixCls(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function selectedKeys(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function title(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        function triggerSubMenuAction(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        namespace active {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace children {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace eventKey {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace multiple {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onClick {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onDeselect {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onDestroy {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onItemHover {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onMouseEnter {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onMouseLeave {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onOpenChange {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onSelect {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onTitleClick {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onTitleMouseEnter {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace onTitleMouseLeave {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace openKeys {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace parentMenu {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace rootPrefixCls {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace selectedKeys {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace title {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

        namespace triggerSubMenuAction {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

    }

    namespace prototype {
        const childContextTypes: any;

        const componentWillMount: any;

        const componentWillReceiveProps: any;

        const componentWillUpdate: any;

        const contextTypes: any;

        const getChildContext: any;

        const getDefaultProps: any;

        const isReactComponent: {
        };

        const isRootMenu: boolean;

        const mixins: any;

        const propTypes: any;

        const shouldComponentUpdate: any;

        const statics: any;

        const updateComponent: any;

        function addKeyPath(info: any): any;

        function componentDidMount(...args: any[]): void;

        function componentDidUpdate(): void;

        function componentWillUnmount(...args: any[]): void;

        function forceUpdate(callback: any): void;

        function getActiveClassName(): any;

        function getDisabledClassName(): any;

        function getInitialState(): any;

        function getOpenClassName(): any;

        function getPrefixCls(): any;

        function getSelectedClassName(): any;

        function isChildrenSelected(): any;

        function isMounted(): any;

        function isOpen(): any;

        function onDeselect(info: any): void;

        function onDestroy(key: any): void;

        function onKeyDown(e: any): any;

        function onMouseEnter(e: any): void;

        function onMouseLeave(e: any): void;

        function onOpenChange(e: any): void;

        function onPopupVisibleChange(visible: any): void;

        function onSelect(info: any): void;

        function onSubMenuClick(info: any): void;

        function onTitleClick(e: any): void;

        function onTitleMouseEnter(domEvent: any): void;

        function onTitleMouseLeave(e: any): void;

        function render(): any;

        function renderChildren(children: any): any;

        function replaceState(newState: any, callback: any): void;

        function saveMenuInstance(c: any): void;

        function saveSubMenuTitle(subMenuTitle: any): void;

        function setState(partialState: any, callback: any): void;

        function triggerOpenChange(open: any, type: any): void;

        namespace addKeyPath {
            const prototype: {
            };

        }

        namespace componentDidMount {
            const prototype: {
            };

        }

        namespace componentDidUpdate {
            const displayName: string;

            const prototype: {
            };

        }

        namespace componentWillUnmount {
            const prototype: {
            };

        }

        namespace forceUpdate {
            const prototype: {
            };

        }

        namespace getActiveClassName {
            const prototype: {
            };

        }

        namespace getDisabledClassName {
            const prototype: {
            };

        }

        namespace getInitialState {
            const displayName: string;

            const isReactClassApproved: {
            };

            const prototype: {
            };

        }

        namespace getOpenClassName {
            const prototype: {
            };

        }

        namespace getPrefixCls {
            const prototype: {
            };

        }

        namespace getSelectedClassName {
            const prototype: {
            };

        }

        namespace isChildrenSelected {
            const prototype: {
            };

        }

        namespace isMounted {
            const prototype: {
            };

        }

        namespace isOpen {
            const prototype: {
            };

        }

        namespace onDeselect {
            const prototype: {
            };

        }

        namespace onDestroy {
            const prototype: {
            };

        }

        namespace onKeyDown {
            const prototype: {
            };

        }

        namespace onMouseEnter {
            const prototype: {
            };

        }

        namespace onMouseLeave {
            const prototype: {
            };

        }

        namespace onOpenChange {
            const prototype: {
            };

        }

        namespace onPopupVisibleChange {
            const prototype: {
            };

        }

        namespace onSelect {
            const prototype: {
            };

        }

        namespace onSubMenuClick {
            const prototype: {
            };

        }

        namespace onTitleClick {
            const prototype: {
            };

        }

        namespace onTitleMouseEnter {
            const prototype: {
            };

        }

        namespace onTitleMouseLeave {
            const prototype: {
            };

        }

        namespace render {
            const displayName: string;

            const prototype: {
            };

        }

        namespace renderChildren {
            const prototype: {
            };

        }

        namespace replaceState {
            const prototype: {
            };

        }

        namespace saveMenuInstance {
            const prototype: {
            };

        }

        namespace saveSubMenuTitle {
            const prototype: {
            };

        }

        namespace setState {
            const prototype: {
            };

        }

        namespace triggerOpenChange {
            const prototype: {
            };

        }

    }

}

