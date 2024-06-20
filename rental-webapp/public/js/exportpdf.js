/*
 *             Copyright (c) 2016 - 2021, CKSource - Frederico Knabben. All rights reserved.
 *
 *
 *
 *
 *          +---------------------------------------------------------------------------------+
 *          |                                                                                 |
 *          |                                 Hello stranger!                                 |
 *          |                                                                                 |
 *          |                                                                                 |
 *          |   What you're currently looking at is the source code of a legally protected,   |
 *          |    proprietary software. Any attempts to deobfuscate / disassemble this code    |
 *          |               are forbidden and will result in legal consequences.              |
 *          |                                                                                 |
 *          |                                                                                 |
 *          +---------------------------------------------------------------------------------+
 *
 *
 *
 *
 */
import{Plugin as _0x478cb0}from'ckeditor5/src/core';import{ButtonView as _0x5ef3de,View as _0x136c2f,Notification as _0x543f70}from'ckeditor5/src/ui';import _0x160c47 from'./exportpdfcommand';import _0x446d05 from'../theme/icons/exportpdf.svg';import'../theme/exportpdf.css';export default class p extends _0x478cb0{static get['pluginName'](){return'ExportPdf';}static get['requires'](){return['CloudServices',_0x543f70];}['init'](){const _0x3b4fc5=this['editor'],t=_0x3b4fc5['t'],_0x505b5b=_0x3b4fc5['config']['get']('exportPdf')||{};_0x3b4fc5['commands']['add']('exportPdf',new _0x160c47(_0x3b4fc5)),_0x3b4fc5['ui']['componentFactory']['add']('exportPdf',_0x5f2efb=>{const _0xf41237=_0x3b4fc5['commands']['get']('exportPdf'),_0x42dd54=new _0x5ef3de(_0x5f2efb);_0x42dd54['set']({'label':t('Export\x20to\x20PDF'),'icon':_0x446d05,'tooltip':!0x0}),_0x42dd54['bind']('isOn','isEnabled')['to'](_0xf41237,'isBusy','isEnabled'),_0x42dd54['extendTemplate']({'attributes':{'class':[_0x42dd54['bindTemplate']['if']('isOn','ck-exportpdf_status-pending')]}});const _0xe5298f=new _0x136c2f();return _0xe5298f['setTemplate']({'tag':'span','attributes':{'class':['ck','ck-exportpdf__spinner-container']},'children':[{'tag':'span','attributes':{'class':['ck','ck-exportpdf__spinner']}}]}),_0x42dd54['children']['add'](_0xe5298f),this['listenTo'](_0x42dd54,'execute',()=>{_0x3b4fc5['execute']('exportPdf',_0x505b5b),_0x3b4fc5['editing']['view']['focus']();}),_0x42dd54;});const _0x9e17c4=_0x3b4fc5['plugins']['get']('CloudServices');if(!0x1===_0x505b5b['tokenUrl'])this['_token']=null;else{if(_0x505b5b['tokenUrl'])return _0x9e17c4['registerTokenUrl'](_0x505b5b['tokenUrl'])['then'](_0x34319f=>{this['_token']=_0x34319f;});this['_token']=_0x9e17c4['token'];}}}