import { Component, OnInit } from '@angular/core';
import * as pdfMake  from 'pdfmake/build/pdfmake' ;
import * as pdfFonts  from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html'
 // styleUrls: ['./about.component.css']
})

export class PDFComponent implements OnInit {
  //docDefinition = {};
  private pdfMake : pdfMake;
  constructor() { 
    this.pdfMake = pdfMake;
	this.pdfMake.vfs = pdfFonts.pdfMake.vfs;
	
  }

  ngOnInit() {
	this.pdfMake.fonts = {
		THSarabunNew: {
		  normal: 'THSarabunNew.ttf',
		  bold: 'THSarabunNew Bold.ttf',
		  italics: 'THSarabunNew Italic.ttf',
		  bolditalics: 'THSarabunNew BoldItalic.ttf'
		},
		Roboto: {
		  normal: 'Roboto-Regular.ttf',
		  bold: 'Roboto-Medium.ttf',
		  italics: 'Roboto-Italic.ttf',
		  bolditalics: 'Roboto-MediumItalic.ttf'
		}
	  }

  }

   genDocument() {
    var docDefinition = {
		defaultStyle: {
			font: 'THSarabunNew',
			fontSize: 10
		},
		styles: {
			headerBlackground: {
				'background-color': '#b2d234'
			}

		},
        content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        'This is a standard paragraph, using default style',
    
        // using a { text: '...' } object lets you set styling properties
        { text: 'This paragraph will have a bigger font', fontSize: 15 },
    
        // if you set the value of text to an array instead of a string, you'll be able
        // to style any part individually
        {
            text: [
            'This paragraph is defined as an array of elements to make it possible to ',
            { text: 'restyle part of it and make it bigger ', fontSize: 15 },
            'than the rest.'
            ]
        },
        {text: 'A simple table with nested elements', style: 'subheader'},
		'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
		{
			style: 'tableExample',
			table: {
				body: [
					['Column 1', 'Column 2', 'Column 3'],
					[
						{
							stack: [
								'Let\'s try an unordered list',
								{
									ul: [
										'item 1',
										'item 2'
									]
								}
							]
						},
						[
							'or a nested table',
							{
								table: {
									body: [
										['Col1', 'Col2', 'Col3'],
										['1', '2', '3'],
										['1', '2', '3']
									]
								},
							}
						],
						{text: [
								'Inlines can be ',
								{text: 'styled\n', italics: true},
								{text: 'easily as everywhere else', fontSize: 10}]
						}
					]
				]
            }
        },
        {text: 'รายการเบิกค่าน้ำมัน', style: 'subheader', fontSize: 15 },
		'จำนวน 1 รายการ',
		{
			style: 'tableExample',
			table: {
				body: [
					['วันที่', 'เรื่องที่ไปดำเนินการ', 'ต้นทาง','ปลายทาง','ขาไป-ขากลับ','ระยะทาง(km)','ยอดเงินสุทธิ(บาท)','สาเหตุ/เหตุผล','แนบไฟล์เอกสาร'],
					[
						{
							text: '10/2/2563'
						},
						{
							text: 'Visit ARS'
						},
						{ text: 'AIS Tower1'
						},
						{text: 'นานา'},
						{text: 'ไปกลับ'},
						{text: '23.12'},
						{text: '1530.00'},
						[{
								table: {
									body: [
										
										['ท่านมี Fleet Card อยู่แล้ว', 'เปลี่ยนรถยนต์กับที่ผูก Fleet Card '],
										['ยอดเบิกเกินกว่าที่ระบบคำนวณได้', 'เดินทาง Visit ARS มากกว่าพื้นที่ ที่ระบุคีย์เบิก (ดูแลหลายพื้นที่)']
									]
								},
							}
						],
						{text: ''}
					]
				],
				
			},
			layout: {
				fillColor: function (rowIndex, node, columnIndex) {
					if(rowIndex == 0) {
						return '#b2d234';
					}else {
						return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
					}
				}
			}
		},
		{text: 'รายการเบิกค่าทางด่วน/EasyPass', style: 'subheader', fontSize: 15 },
		'จำนวน 2 รายการ',
		{
			style: 'tableExample',
			table: {
				widths: [ '*', 'auto', 100, '*' ,'*','*','*'],
				body: [
					['วันที่', 'เรื่องที่ไปดำเนินการ', 'ต้นทาง','ปลายทาง','ยอดเงินสุทธิ(บาท)','สาเหตุ/เหตุผล','แนบไฟล์เอกสาร'],
					[
						{
							text: '10/2/2563'
						},
						{
							text: 'Visit ARS'
						},
						{ text: 'AIS Tower1'
						},
						{text: 'ดอนเมือง'},
						{text: '70.00'},
						
						[],
						{text: ''}
					],
					[
						{
							text: '10/2/2563'
						},
						{
							text: 'Visit ARS'
						},
						{ text: 'AIS Tower1'
						},
						{text: 'นานา,พระโขนง'},
						{text: '75.00'},
						
						[],
						{text: ''}
					]
				]
			},
			layout: {
				fillColor: function (rowIndex, node, columnIndex) {
					if(rowIndex == 0) {
						return '#b2d234';
					}else {
						return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
					}
				}
			}
        },
        

        ]
    };
    return docDefinition;
  }

  public createPDF() {
     var docDefinition =  this.genDocument();
     this.pdfMake.createPdf(docDefinition).open();
     //createPdf(docDefinition).open({}, window);
  }

}
